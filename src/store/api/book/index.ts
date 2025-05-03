import { IBook, IBookDetails, ICategory, IPopularBooks } from "../../../types";
import { api as index } from "../index";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getProduct: build.query<IBook[], void>({
      query: () => ({
        url: "/books/",
        method: "GET",
      }),
    }),
    getCategories: build.query<ICategory[], void>({
      query: () => ({
        url: "/category/",
        method: "GET",
      }),
    }),
    getPopularBooks: build.query<IPopularBooks[], void>({
      query: () => ({
        url: "/top-books/",
        method: "GET",
      }),
    }),
    getBookById: build.query<IBookDetails, number>({
      query: (id) => ({
        url: `/books/${id}/`,
        method: "GET",
      }),
    }),
    likeBook: build.mutation<void, { book_id: number; uid: string | null }>({
      query: ({ book_id, uid }) => ({
        url: `/like/`,
        method: "POST",
        body: { book: book_id, unique_field: uid },
      }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetPopularBooksQuery,
  useGetBookByIdQuery,
  useLikeBookMutation,
} = api;
