import { useState } from "react";
import { useLikeBookMutation } from "../../store/api/book";

export const useLikeBook = (
  bookId: string | undefined,
  userId: string | null,
  refetch: () => void
) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeBook] = useLikeBookMutation();

  const handleLike = async () => {
    if (!bookId || !userId) {
      alert("Ошибка: отсутствует ID книги или пользователя");
      return;
    }

    const likedBooks = JSON.parse(localStorage.getItem("Liked-Books") || "[]");
    if (likedBooks.includes(bookId)) {
      alert("Вы уже лайкнули эту книгу!");
      return;
    }

    try {
      await likeBook({ book_id: Number(bookId), uid: userId }).unwrap();
      const updatedLikedBooks = [...likedBooks, bookId];
      localStorage.setItem("Liked-Books", JSON.stringify(updatedLikedBooks));
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
        localStorage.setItem("Liked-Books", JSON.stringify(updatedLikedBooks));
        setIsLiked(true);
        alert("Эта книга уже была лайкнута.");
      } else {
        alert("Не удалось поставить лайк. Попробуйте позже.");
      }
    }
  };

  return { isLiked, setIsLiked, handleLike };
};
