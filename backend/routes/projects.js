const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const { protect } = require('../middleware/auth');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  addTeamMember,
  removeTeamMember
} = require('../controllers/projectController');

// Validation rules
const projectValidation = [
  body('name').trim().notEmpty().withMessage('Project name is required'),
  body('description').trim().notEmpty().withMessage('Project description is required')
];

const addMemberValidation = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('role').optional().isIn(['owner', 'manager', 'member', 'viewer']).withMessage('Invalid role')
];

// Routes
router.route('/')
  .get(protect, getProjects)
  .post(protect, projectValidation, validate, createProject);

router.route('/:id')
  .get(protect, getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

router.route('/:id/members')
  .post(protect, addMemberValidation, validate, addTeamMember);

router.route('/:id/members/:userId')
  .delete(protect, removeTeamMember);

module.exports = router;
