import React from 'react';

const CompletedList = ({ completed, handleDelete, handleUndo, formatDate }) => (
  <div className="mt-10">
    <h2 className="text-xl font-semibold text-completed mb-2">Completed Tasks</h2>
    <ul className="space-y-2">
      {completed.map(task => (
        <li key={task._id} className="flex flex-col md:flex-row md:items-center justify-between bg-completed/10 rounded-lg p-3 text-completed border border-indigo-200 shadow-md">
          <div>
            <div className="font-medium text-lg">{task.text}</div>
            <div className="text-xs mt-1">Completed: {formatDate(task.completedAt)}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleUndo(task._id)} className="px-5 py-2 text-base font-semibold rounded-xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-white shadow border-none focus:outline-none focus:ring-2 focus:ring-indigo-200">Undo</button>
            <button onClick={() => handleDelete(task._id, 'completed')} className="px-5 py-2 text-base font-semibold rounded-xl bg-gradient-to-r from-red-400 to-rose-600 text-white shadow border-none focus:outline-none focus:ring-2 focus:ring-red-200">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default CompletedList;
