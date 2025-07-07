import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import CompletedList from './components/CompletedList';
import DeletedList from './components/DeletedList';
import { getTasks, createTask, completeTask, deleteTask, undoTask } from './services/taskService';

function formatDate(date) {
 return new Date(date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
}

function App() {

  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [input, setInput] = useState('');
  const [date, setDate] = useState('');
 
  const handleAdd = () => {
 if (!input.trim() || !date) {
 alert('Please enter a task and select a date.');
 return;
 }

 createTask({ text: input, date })
      .then(data => {
        setInput('');
        setDate('');
        fetchTasks(); // Refetch tasks to update the UI
      })
      .catch(error => {
        console.log('Error creating task:', error);
        // alert('Failed to create a long task.');
        
        ;
      });
  };

  const handleComplete = (id) => {
 completeTask(id)
      .then(data => {
        fetchTasks(); // Refetch tasks to update the UI
      })
      .catch(error => {
        alert('Failed to complete task.');
       console.log('Failed to complete task.');
      });
  };

  const handleDelete = (id, from = 'tasks') => {
 deleteTask(id)
      .then(data => {
        fetchTasks(); // Refetch tasks to update the UI
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        alert('Failed to delete task.');
      });
  };

  // This function might need adjustment based on backend implementation for undo
  const handleUndo = (id) => {
    console.log('Undoing task with id:', id);
    // const task = completed.find((t) => {
    //   console.log('Checking task:', t._id, 'against id:', id);
    //   console.log(t._id === id) 
    // });
    // if (!task) return;
    // Implement backend API call for undo if needed
    undoTask(id)
      .then(data => {
        fetchTasks(); // Refetch tasks to update the UI
      })
      .catch(error => {
        console.error('Error undoing task:', error);
        alert('Failed to undo task.');
      });
  };

  const fetchTasks = () => {
 getTasks()
      .then(data => {
        setTasks(data.filter(task => !task.completed && !task.deleted));
        setCompleted(data.filter(task => task.completed && !task.deleted));
        setDeleted(data.filter(task => task.deleted).slice(0, 3)); // Keep last 3 deleted tasks
      })
      .catch(error => {
 console.error('Error fetching tasks:', error);
//  alert('Failed to fetch tasks.');
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Fetch tasks on component mount


  return (
    <div className="flex flex-col items-center py-10 px-2 min-h-screen bg-gradient-to-br from-blue-100 via-white to-cyan-100 font-display">
      <div className="w-full max-w-2xl bg-white/80 rounded-3xl shadow-2xl p-8 backdrop-blur-md border border-blue-100">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400 mb-2 text-center drop-shadow-lg">Stunning To-Do App</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">Organize your day with style ✨</p>

        <TaskInput input={input} setInput={setInput} date={date} setDate={setDate} handleAdd={handleAdd} />
        {tasks.length > 0 && (
          <TaskList tasks={tasks} handleComplete={handleComplete} handleDelete={handleDelete} formatDate={formatDate} />
        )}
        {completed.length > 0 && (
          <CompletedList completed={completed} handleDelete={handleDelete} handleUndo={handleUndo} formatDate={formatDate} />
        )}
        {deleted.length > 0 && (
          <DeletedList deleted={deleted} formatDate={formatDate} />
        )}

        <div className="mt-10 text-center text-gray-400 text-xs">by GitHub Copilot</div>
      </div>
    </div>
  );
}

export default App;

