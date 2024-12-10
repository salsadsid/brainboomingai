// components/Todos.tsx
"use client";

import React from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TodosProps {
  todos: Todo[];
}

const Todos: React.FC<TodosProps> = ({ todos }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold my-4">Todo List</h1>
      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="p-4 border rounded shadow-sm">
            <h2 className="text-lg font-semibold">{todo.title}</h2>
            <p className="text-gray-700">{todo.description}</p>
            <p className="text-sm text-gray-500">
              Created: {new Date(todo.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Todos;
