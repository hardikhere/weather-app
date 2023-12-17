import { useCallback, useEffect, useState } from "react";

const useUrlSyncQuery = () => {
  const [searchQuery, setSearchQuery] = useState("Delhi");

  const handlePopState = () => {
    const url = new URL(`${window.location}`);
    const queryParam = url.searchParams.get("query");
    setSearchQuery(queryParam || "");
  };

  const updateURL = useCallback(() => {
    const url = new URL(`${window.location}`);
    url.searchParams.set("query", searchQuery);
    window.history.pushState({}, "", url);
  }, [searchQuery]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  // Listen for back/forward button clicks
  useEffect(() => {
    updateURL();
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [updateURL]);

  return {
    onChange: handleInputChange,
    updateURL,
    searchQuery,
    setSearchQuery,
  };
};

export default useUrlSyncQuery;
