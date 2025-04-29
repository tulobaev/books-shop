import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOption) => {
  const response = await baseQuery(args, api, extraOption);
  return response;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: [""],
  endpoints: () => ({}),
});
