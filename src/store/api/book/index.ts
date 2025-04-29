import { api as index } from "../index";

export interface Book {
  id: number;
  book_name: string;
  book_image: string | null;
  description: string;
  publication_year: number;
  category?: {
    category_name: string;
  };
}

interface Category {
  category_name: string;
}

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
  }),
});

export const { useGetProductQuery, useGetCategoriesQuery } = api;
