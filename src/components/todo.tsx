import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      title: inputValue,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputValue("");
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-xl font-medium">Todo List</h1>
      <div className="flex flex-col max-w-md items-start gap-4 mt-1">
        {" "}
        <div className="flex items-center gap-2 w-full">
          {" "}
          <input
            value={inputValue}
            className="px-2 py-1 border rounded-md border-gray-400"
            placeholder="Enter the todo..."
            onChange={handleInputChange}
          />
          <button
            className="text-sm bg-black text-white px-2 py-1 border rounded-md"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>
        <ul className="mt-5 w-full">
          {todos.map((todo) => (
            <div className="flex items-center justify-between w-full gap-4">
              <li
                key={todo.id}
                className={`mt-2 ${todo.completed ? "line-through" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  className="mr-2 cursor-pointer"
                />
                {todo.title}
              </li>
              <button
                className="text-white bg-red-600 text-xs p-1 cursor-pointer border rounded-sm"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
