"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Task {
  title: string;
  description: string;
  dueDate: string;
}

export default function Home() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState<Task>({ title: '', description: '', dueDate: '' });

  const handleAddTaskClick = () => {
    setShowAddTask(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/todo/add', {
        method: "POST",
        body: JSON.stringify(newTask)
      })
      console.log('Task saved successfully!');
      console.log({ response })
      setShowAddTask(false);
      setNewTask({ title: '', description: '', dueDate: '' });
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleClose = () => {
    setShowAddTask(false);
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  return (
    <div className="container mx-auto px-4 relative">
      <button
        onClick={handleAddTaskClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
      >
        Add New Task
      </button>
      {showAddTask && (
        <div className="absolute top-5 left-0 bg-white right-0 shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Add New Task</h3>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-600 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newTask.title}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <input
                type="date"
                name="dueDate"
                placeholder="Due Date"
                value={newTask.dueDate}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <textarea
                name="description"
                placeholder="Description"
                value={newTask.description}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
