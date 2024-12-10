// services/todosApi.ts
import api from "./api";

export const todosApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos", // Endpoint to fetch todos
      providesTags: ["Todo"],
    }),
    createTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation } = todosApi;
