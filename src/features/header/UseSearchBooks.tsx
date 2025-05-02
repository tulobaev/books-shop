import { useState, useEffect } from "react";
import { useGetProductQuery } from "../../store/api/book";
import { IBook } from "../../types";

export const useSearchBooks = () => {
  const { data: books = [] } = useGetProductQuery();
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<IBook[]>([]);

  useEffect(() => {
    const value = query.trim().toLowerCase();
    if (value.length < 2) return setFilteredResults([]);

    const filtered = books.filter((book) =>
      book.book_name.toLowerCase().includes(value)
    );
    setFilteredResults(filtered.slice(0, 5));
  }, [query]);

  const clear = () => {
    setQuery("");
    setFilteredResults([]);
  };

  return { query, setQuery, filteredResults, clear };
};
