"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import TodoModel from "./TodoModel";
import { useRouter } from "next/navigation";
import axios from "axios";
import dayjs from 'dayjs';

const Todo = ({ todo, currentUser }: any) => {
    const router = useRouter();

    const handleDelete = async (e: any) => {
        try {
            e.preventDefault();
            await axios.delete(`/api/todo/${todo.id}`);
            console.log('Todo deleted successfully!');
            router.refresh();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader >
                <CardTitle className="text-lg font-semibold">{todo.title}</CardTitle>
                <CardDescription>
                    <div className="flex flex-col items-start mb-2">
                        <div className={`px-3 py-1 rounded-full text-sm mr-2  ${todo.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                            {todo.completed ? 'Completed' : 'Pending'}
                        </div>
                        <div className="text-gray-700">{todo.description}</div>
                    </div>
                </CardDescription>

            </CardHeader>
            <CardContent className="p-6">
                <CardDescription className="text-gray-600 mb-4">
                    Due Date: {dayjs(todo.dueDate).format('MMM D, YYYY')}
                </CardDescription>
                <div className="flex space-x-2">
                    <TodoModel completed={todo.completed ? "completed" : "pending"} label="Edit" id={todo.id} title={todo.title} description={todo.description} dueDate={todo.dueDate} />
                    {todo.userId === currentUser?.id && (
                        <button
                            onClick={handleDelete}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default Todo;