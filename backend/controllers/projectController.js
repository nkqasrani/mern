const Project = require('../models/Project');
const Task = require('../models/Task');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
exports.getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = {
      $or: [
        { owner: req.user.id },
        { 'teamMembers.user': req.user.id }
      ]
    };

    // Filtering
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    // Search
    if (req.query.search) {
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { description: { $regex: req.query.search, $options: 'i' } }
        ]
      });
    }

    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .populate('owner', 'name email')
      .populate('teamMembers.user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email avatar')
      .populate('teamMembers.user', 'name email avatar');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user has access
    const hasAccess = project.owner._id.toString() === req.user.id ||
      project.teamMembers.some(member => member.user._id.toString() === req.user.id);

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this project'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
  try {
    req.body.owner = req.user.id;
    
    // Add owner to team members
    req.body.teamMembers = [{
      user: req.user.id,
      role: 'owner'
    }];

    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check ownership or manager role
    const isOwner = project.owner.toString() === req.user.id;
    const isManager = project.teamMembers.some(
      member => member.user.toString() === req.user.id && 
      (member.role === 'manager' || member.role === 'owner')
    );

    if (!isOwner && !isManager && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this project'
      });
    }

    // Prevent changing owner
    delete req.body.owner;

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('owner', 'name email').populate('teamMembers.user', 'name email');

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Only owner or admin can delete
    if (project.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this project'
      });
    }

    // Delete all tasks associated with project
    await Task.deleteMany({ project: req.params.id });

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project and associated tasks deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add team member to project
// @route   POST /api/projects/:id/members
// @access  Private
exports.addTeamMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if requester is owner or manager
    const isOwner = project.owner.toString() === req.user.id;
    const isManager = project.teamMembers.some(
      member => member.user.toString() === req.user.id && 
      (member.role === 'manager' || member.role === 'owner')
    );

    if (!isOwner && !isManager) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add team members'
      });
    }

    // Check if user is already a member
    const isMember = project.teamMembers.some(
      member => member.user.toString() === req.body.userId
    );

    if (isMember) {
      return res.status(400).json({
        success: false,
        message: 'User is already a team member'
      });
    }

    project.teamMembers.push({
      user: req.body.userId,
      role: req.body.role || 'member'
    });

    await project.save();

    const updatedProject = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('teamMembers.user', 'name email');

    res.status(200).json({
      success: true,
      message: 'Team member added successfully',
      data: updatedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove team member from project
// @route   DELETE /api/projects/:id/members/:userId
// @access  Private
exports.removeTeamMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if requester is owner or manager
    const isOwner = project.owner.toString() === req.user.id;
    const isManager = project.teamMembers.some(
      member => member.user.toString() === req.user.id && 
      (member.role === 'manager' || member.role === 'owner')
    );

    if (!isOwner && !isManager) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to remove team members'
      });
    }

    // Cannot remove owner
    if (project.owner.toString() === req.params.userId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot remove project owner'
      });
    }

    project.teamMembers = project.teamMembers.filter(
      member => member.user.toString() !== req.params.userId
    );

    await project.save();

    res.status(200).json({
      success: true,
      message: 'Team member removed successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
