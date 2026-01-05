const Task = require('../models/Task');
const Project = require('../models/Project');

// Helper function to check project access
const checkProjectAccess = async (projectId, userId) => {
  const project = await Project.findById(projectId);
  if (!project) return false;
  
  const hasAccess = project.owner.toString() === userId ||
    project.teamMembers.some(member => member.user.toString() === userId);
  
  return hasAccess;
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    // Filter by project
    if (req.query.project) {
      // Check access
      const hasAccess = await checkProjectAccess(req.query.project, req.user.id);
      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this project'
        });
      }
      query.project = req.query.project;
    } else {
      // Get all projects user has access to
      const projects = await Project.find({
        $or: [
          { owner: req.user.id },
          { 'teamMembers.user': req.user.id }
        ]
      }).select('_id');
      
      query.project = { $in: projects.map(p => p._id) };
    }

    // Filtering
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.priority) {
      query.priority = req.query.priority;
    }
    if (req.query.assignedTo) {
      query.assignedTo = req.query.assignedTo;
    }

    // Search
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .populate('project', 'name')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: tasks.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project', 'name')
      .populate('assignedTo', 'name email avatar')
      .populate('createdBy', 'name email avatar')
      .populate('comments.user', 'name email avatar');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check project access
    const hasAccess = await checkProjectAccess(task.project._id, req.user.id);
    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this task'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  try {
    // Check project access
    const hasAccess = await checkProjectAccess(req.body.project, req.user.id);
    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create tasks in this project'
      });
    }

    req.body.createdBy = req.user.id;
    const task = await Task.create(req.body);

    const populatedTask = await Task.findById(task._id)
      .populate('project', 'name')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: populatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check project access
    const hasAccess = await checkProjectAccess(task.project, req.user.id);
    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }

    // If status is being changed to completed, set completedAt
    if (req.body.status === 'completed' && task.status !== 'completed') {
      req.body.completedAt = new Date();
    }

    // Prevent changing project and createdBy
    delete req.body.project;
    delete req.body.createdBy;

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate('project', 'name')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check project access
    const project = await Project.findById(task.project);
    const isOwner = project.owner.toString() === req.user.id;
    const isCreator = task.createdBy.toString() === req.user.id;

    if (!isOwner && !isCreator && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add comment to task
// @route   POST /api/tasks/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check project access
    const hasAccess = await checkProjectAccess(task.project, req.user.id);
    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to comment on this task'
      });
    }

    task.comments.push({
      user: req.user.id,
      text: req.body.text
    });

    await task.save();

    const updatedTask = await Task.findById(req.params.id)
      .populate('comments.user', 'name email avatar');

    res.status(200).json({
      success: true,
      message: 'Comment added successfully',
      data: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats/overview
// @access  Private
exports.getTaskStats = async (req, res) => {
  try {
    // Get all projects user has access to
    const projects = await Project.find({
      $or: [
        { owner: req.user.id },
        { 'teamMembers.user': req.user.id }
      ]
    }).select('_id');

    const projectIds = projects.map(p => p._id);

    // Get statistics
    const totalTasks = await Task.countDocuments({ project: { $in: projectIds } });
    const completedTasks = await Task.countDocuments({ 
      project: { $in: projectIds },
      status: 'completed'
    });
    const myTasks = await Task.countDocuments({ 
      project: { $in: projectIds },
      assignedTo: req.user.id
    });
    const overdueTasks = await Task.countDocuments({
      project: { $in: projectIds },
      status: { $nin: ['completed', 'cancelled'] },
      dueDate: { $lt: new Date() }
    });

    // Tasks by status
    const tasksByStatus = await Task.aggregate([
      { $match: { project: { $in: projectIds } } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Tasks by priority
    const tasksByPriority = await Task.aggregate([
      { $match: { project: { $in: projectIds } } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalTasks,
        completed: completedTasks,
        myTasks,
        overdue: overdueTasks,
        byStatus: tasksByStatus,
        byPriority: tasksByPriority
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
