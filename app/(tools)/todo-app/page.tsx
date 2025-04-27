"use client";
import TodosClient from "@/components/todos/TodosClient";
import { useCreateTodoMutation } from "@/redux/api/todosApi";
import { useState } from "react";

export default function TodoApp() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");
  const [createTodo] = useCreateTodoMutation();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(form);
    try {
      const res = await createTodo(form).unwrap();
      //   console.log(res, res.ok);
      if (res?._id) {
        setMessage("Todo added successfully!");
        setForm({ title: "", description: "" });
      } else {
        const { message } = await res.json();
        setMessage(message || "An error occurred.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
    }
  };
  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create Todo</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Todo
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {/* <TodosServer /> */}
      {/* <Todos />
       */}
      <TodosClient />
    </div>
  );
}
