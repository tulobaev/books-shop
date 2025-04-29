import { api as index } from "../index";
import { Book, Category, BookDetails } from "../../../types";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getProduct: build.query<Book[], void>({
      query: () => ({
        url: "/books/",
        method: "GET",
      }),
    }),
    getCategories: build.query<Category[], void>({
      query: () => ({
        url: "/category/",
        method: "GET",
      }),
    }),
    getPopularBooks: build.query<Book[], void>({
      query: () => ({
        url: "/top-books/",
        method: "GET",
      }),
    }),
    getBookById: build.query<BookDetails, number>({
      query: (id) => ({
        url: `/books/${id}/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetPopularBooksQuery,
  useGetBookByIdQuery,
} = api;
