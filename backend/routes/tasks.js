const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const { protect } = require('../middleware/auth');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  addComment,
  getTaskStats
} = require('../controllers/taskController');

// Validation rules
const taskValidation = [
  body('title').trim().notEmpty().withMessage('Task title is required'),
  body('project').notEmpty().withMessage('Project is required')
];

const commentValidation = [
  body('text').trim().notEmpty().withMessage('Comment text is required')
];

// Routes
router.get('/stats/overview', protect, getTaskStats);

router.route('/')
  .get(protect, getTasks)
  .post(protect, taskValidation, validate, createTask);

router.route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

router.route('/:id/comments')
  .post(protect, commentValidation, validate, addComment);

module.exports = router;
