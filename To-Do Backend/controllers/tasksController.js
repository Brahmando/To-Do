const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { text, date } = req.body;
    const newTask = new Task({
      text,
      date,
    });
    const savedTask = await newTask.save();
    console.log('hello from createTask from backend')
    console.log('Saved task in backend:', savedTask);
    
    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Complete a task
exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.completed = true;
    task.completedAt = new Date();
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Undo a completed task
exports.undoTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.completed = false;
    task.completedAt = null;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};  

// Delete a task (soft delete)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.deleted = true;
    task.deletedAt = new Date();
    const deletedTask = await task.save();
    res.json(deletedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};