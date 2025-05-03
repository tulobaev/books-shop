import React from "react";

const USER_ID_KEY = "User-Id";

export const useUserId = () => {
  const [id, setId] = React.useState<string>(
    JSON.parse(localStorage.getItem(USER_ID_KEY) || "null")
  );
  React.useEffect(() => {
    const storageUID = JSON.parse(localStorage.getItem(USER_ID_KEY) || "null");
    if (storageUID) {
      setId(storageUID);
    } else {
      const id = `User-Id-${Date.now()}`;
      setId(id);
      localStorage.setItem(USER_ID_KEY, JSON.stringify(id));
    }
  }, []);
  return id;
};
