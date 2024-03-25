"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "../components/ui/dialog"

interface Task {
    title: string;
    description: string;
    dueDate: string;
}

const AddTodoHome = () => {
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
            const response = await axios.post('/api/todo/add', newTask);
            console.log('Task saved successfully!');
            console.log({ response })
            setShowAddTask(false);
            setNewTask({ title: '', description: '', dueDate: '' });
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 relative">
            <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
                <DialogTrigger>
                    <button
                        onClick={handleAddTaskClick}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                    >
                        Add New Task
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Task</DialogTitle>
                        <DialogDescription>
                            add a new task to your day
                        </DialogDescription>
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
                            <div className="mb-6 h-40 overflow-auto">
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={newTask.description}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-full"
                                />
                            </div>
                            <DialogFooter>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Save
                                </button>
                            </DialogFooter>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddTodoHome