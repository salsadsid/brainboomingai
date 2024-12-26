import api from "./api";

export const promptApi = api.injectEndpoints({
  endpoints: (builder) => ({
    generateResponse: builder.mutation({
      query: ({ prompt, tool }) => ({
        url: "/generate",
        method: "POST",
        body: { prompt, tool },
      }),
    }),
  }),
});

export const { useGenerateResponseMutation } = promptApi;
