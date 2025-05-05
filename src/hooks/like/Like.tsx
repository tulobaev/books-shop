import { useState } from "react";
import { useLikeBookMutation } from "../../store/api/book";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LIKED_BOOKS_KEY = "Liked-Books";

export const useLikeBook = (
  bookId: string | undefined,
  userId: string | null,
  refetch: () => void
) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeBook] = useLikeBookMutation();

  const handleLike = async () => {
    if (!bookId || !userId) {
      toast.error("Лайк коюуда ката кетти", {
        position: "top-right",
      });
      return;
    }

    const likedBooks = JSON.parse(
      localStorage.getItem(LIKED_BOOKS_KEY) || "[]"
    );
    if (likedBooks.includes(bookId)) {
      toast.warn("Бул китепке лайк койгонсуз", {
        position: "top-right",
      });
      return;
    }

    try {
      await likeBook({ book_id: Number(bookId), uid: userId }).unwrap();

      const updatedLikedBooks = [...likedBooks, bookId];
      localStorage.setItem(LIKED_BOOKS_KEY, JSON.stringify(updatedLikedBooks));

      setIsLiked(true);
      refetch();
    } catch (error: any) {
      console.error("Failed to like the book:", error);
      if (
        error.status === 400 &&
        error.data?.unique_field?.includes(
          "book like бул unique field менен мурдатан эле бар"
        )
      ) {
        const updatedLikedBooks = [...likedBooks, bookId];
        localStorage.setItem(
          LIKED_BOOKS_KEY,
          JSON.stringify(updatedLikedBooks)
        );
        setIsLiked(true);
        alert("Эта книга уже была лайкнута.");
      } else {
        alert("Не удалось поставить лайк. Попробуйте позже.");
      }
    }
  };

  return { isLiked, setIsLiked, handleLike };
};
