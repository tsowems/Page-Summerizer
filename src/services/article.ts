import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API__AI_ARTICLE_KEY;

type CustomizedFetchBaseQueryError = {
  message?: string;
  errors?: { [key: string]: string };
};

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: <
    BaseQueryFn<string | FetchArgs, unknown, CustomizedFetchBaseQueryError, {}>
  >fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set(
        "X-RapidAPI-Host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=5`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
