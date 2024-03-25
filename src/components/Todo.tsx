const Todo = ({ todo, currentUser }: any) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">{todo.title}</h2>
            <div className="flex items-center justify-between">
                <span
                    className={`text-sm font-medium ${todo.completed ? "text-green-500" : "text-gray-500"
                        }`}
                >
                    {todo.completed ? "Completed" : "Pending"}
                </span>
                <div className="flex">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Edit
                    </button>
                    {todo.userId === currentUser?.id && (
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Todo;