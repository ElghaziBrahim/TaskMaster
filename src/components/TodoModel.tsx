"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



interface Task {
    title: string;
    description: string;
    dueDate: string;
    completed?: string;
}
interface TodoModelProps {
    id?: number,
    title?: string;
    description?: string;
    dueDate?: string;
    label: string,
    completed?: string;
}
const TodoModel = ({ id, title, description, dueDate, label, completed }: TodoModelProps) => {
    const { toast } = useToast()
    const router = useRouter()
    const [showAddTask, setShowAddTask] = useState(false);

    const [newTask, setNewTask] = useState<Task>({
        title: title ? title : '',
        description: description ? description : '',
        dueDate: dueDate ? dueDate : '',
        completed: completed ? completed : "",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (id) {
                const response = await axios.patch(`/api/todo/${id}`, newTask);
                toast({
                    description: "Todo edited successfully.",
                })
                router.refresh();
            } else {
                const response = await axios.post('/api/todo/add', newTask);
                toast({
                    description: "Todo added successfully.",
                })
                router.refresh();
            }
            setShowAddTask(false);
            
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };
    return (
        <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
            <DialogTrigger>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {label}  {label == "Add New" ? "Task" : null}
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{label} Task</DialogTitle>
                    <DialogDescription className="text-gray-600 mb-4">
                        Add a new task to your day
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
                        <div className="mb-2">
                            <Select onValueChange={value => {
                                setNewTask(prevState => ({
                                    ...prevState,
                                    completed: value,
                                }));
                            }} defaultValue={newTask.completed}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">pending</SelectItem>
                                    <SelectItem value="completed">completed</SelectItem>
                                </SelectContent>
                            </Select>
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
                        <DialogFooter className="flex justify-end">
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
        </Dialog >
    )
}

export default TodoModel