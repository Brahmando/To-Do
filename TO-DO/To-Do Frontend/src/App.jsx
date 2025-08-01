import React, { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import CompletedList from './components/CompletedList';
import DeletedList from './components/DeletedList';


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
    if (!input.trim() || !date) return;
    setTasks([
      { text: input, date, created: new Date().toISOString(), id: Date.now() },
      ...tasks,
    ]);
    setInput('');
    setDate('');
  };

  const handleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);
    setTasks(tasks.filter((t) => t.id !== id));
    setCompleted([{ ...task, completedAt: new Date().toISOString() }, ...completed]);
  };

  const handleDelete = (id, from = 'tasks') => {
    let task;
    if (from === 'tasks') {
      task = tasks.find((t) => t.id === id);
      setTasks(tasks.filter((t) => t.id !== id));
    } else {
      task = completed.find((t) => t.id === id);
      setCompleted(completed.filter((t) => t.id !== id));
    }
    setDeleted([{ ...task, deletedAt: new Date().toISOString() }, ...deleted.slice(0, 2)]);
  };

  const handleUndo = (id) => {
    const task = completed.find((t) => t.id === id);
    if (!task) return;
    setCompleted(completed.filter((t) => t.id !== id));
    setTasks([{ ...task, completedAt: undefined }, ...tasks]);
  };

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
