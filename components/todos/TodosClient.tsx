"use client";

import { useGetTodosQuery } from "@/redux/api/todosApi";
import React from "react";
import Todos from "./Todos";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const TodosClient: React.FC = () => {
  const { data: todos, error, isLoading: loading } = useGetTodosQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return <Todos todos={todos} />;
};

export default TodosClient;
