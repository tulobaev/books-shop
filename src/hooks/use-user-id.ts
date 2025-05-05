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

const VIEWED_KEY = "Viewed-Books";

export const useViewLogic = (
  bookId: string | undefined,
  userId: string | null
) => {
  const [viewLog] = useViewingCountMutation();
  const [hasTrackedView, setHasTrackedView] = useState<boolean>(false);

  useEffect(() => {
    const trackView = async () => {
      if (!bookId || !userId || hasTrackedView) return;

      try {
        let viewedBooks: string[] = [];
        try {
          const stored = localStorage.getItem(VIEWED_KEY);
          viewedBooks = stored ? JSON.parse(stored) : [];
        } catch (error) {
          console.error("Ошибка чтения Viewed-Books из localStorage:", error);
          viewedBooks = [];
        }

        const viewKey = `${bookId}-${userId}`;

        if (!viewedBooks.includes(viewKey)) {
          await viewLog({ book_idView: Number(bookId), usid: userId }).unwrap();

          viewedBooks.push(viewKey);
          localStorage.setItem(VIEWED_KEY, JSON.stringify(viewedBooks));
        }

        setHasTrackedView(true);
      } catch (error) {
        console.error("Error tracking view:", error);
      }
    };

    trackView();
  }, [bookId, userId, viewLog, hasTrackedView]);
};
