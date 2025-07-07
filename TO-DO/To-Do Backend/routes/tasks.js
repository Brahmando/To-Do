const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Assuming your model is in models/Task.js
const {
  createTask,
  getTasks,
  completeTask,
  deleteTask,
  undoTask // Import the new controller function
} = require('../controllers/tasksController'); // Corrected import path

// POST /api/tasks
router.post('/', createTask);

// GET /api/tasks
router.get('/', getTasks);

// PUT /api/tasks/:id/complete
router.put('/:id/complete', completeTask);

// DELETE /api/tasks/:id
router.delete('/:id', deleteTask);

// PUT /api/tasks/:id/undo
router.put('/:id/undo', undoTask); // Add the new route

module.exports = router;