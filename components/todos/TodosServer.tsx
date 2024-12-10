// components/TodosServer.tsx

import Todos from "./Todos";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const TodosServer = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`, {
    cache: "no-store", // Ensures the data is fresh
  });

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  const todos: Todo[] = await response.json();

  return <Todos todos={todos} />;
};

export default TodosServer;
