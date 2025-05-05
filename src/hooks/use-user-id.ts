import { useEffect, useState } from "react";
import { useViewingCountMutation } from "../store/api/book";

const USER_ID_KEY = "User-Ids";

export const userID = (bookId: string | undefined) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!bookId) return;

    let userIds: Record<string, string> = {};

    try {
      const store = localStorage.getItem(USER_ID_KEY);
      userIds = store ? JSON.parse(store) : {};
    } catch (error) {
      console.error("Ошибка при чтении User-Ids из localStorage:", error);
    }

    if (userIds[bookId]) {
      setUserId(userIds[bookId]);
    } else {
      const newId = `User-Id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      userIds[bookId] = newId;
      localStorage.setItem(USER_ID_KEY, JSON.stringify(userIds));
      setUserId(newId);
    }
  }, [bookId]);

  return userId;
};

// ? VIEWING
// ? VIEWING

const VIEWED_KEY = "Viewed-Books";

export const useViewLogic = (
  bookId: string | undefined,
  userId: string | null
) => {
  const [viewLog] = useViewingCountMutation();

  useEffect(() => {
    if (!bookId || !userId) return;

    let viewedBooks: string[] = [];

    try {
      const stored = localStorage.getItem(VIEWED_KEY);
      viewedBooks = stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Ошибка чтения Viewed-Books из localStorage:", error);
      viewedBooks = [];
    }

    if (!viewedBooks.includes(bookId)) {
      viewLog({ book_idView: Number(bookId), usid: userId });
      viewedBooks.push(bookId);
      localStorage.setItem(VIEWED_KEY, JSON.stringify(viewedBooks));
    }
  }, [bookId, userId, viewLog]);
};
