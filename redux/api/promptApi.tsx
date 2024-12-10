import api from "./api";

export const promptApi = api.injectEndpoints({
  endpoints: (builder) => ({
    generateResponse: builder.mutation({
      query: (prompt: string) => ({
        url: "/generate",
        method: "POST",
        body: { prompt },
      }),
    }),
  }),
});

export const { useGenerateResponseMutation } = promptApi;
