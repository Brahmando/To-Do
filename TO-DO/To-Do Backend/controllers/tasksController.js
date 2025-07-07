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
    console.log('hello from createTask')
    console.log('Saved task:', savedTask);
    
    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Undo a completed task
exports.undoTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // findById naturally uses _id
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (!task.completed) {
      return res.status(400).json({ message: 'Task is not completed' });
    }
    task.completed = false;
    task.completedAt = undefined; // Or null, depending on how you want to store it
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}, '_id text date created completed completedAt deleted deletedAt'); // Explicitly select fields including _id
    // You might want to filter these tasks in the backend to return only active, completed, or deleted based on query parameters
    // For now, sending all data and frontend will filter
    const formattedTasks = tasks.map(task => ({
      _id: task._id, // Ensure _id is included
      text: task.text,
      date: task.date,
      created: task.created,
    })); // Basic formatting, add other fields as needed on frontend
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Complete a task
exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // findById naturally uses _id
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

// Delete a task (soft delete)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // findById naturally uses _id
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