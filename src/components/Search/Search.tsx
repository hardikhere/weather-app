import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import useUrlSyncQuery from "../../hooks/useUrlSyncQuery";
import SearchSuggestions from "./SearchSuggestions";
import { useEffect, useRef, useState } from "react";
import "./styles.css";

interface ISearchProps {
  onSearch: (city: string) => void;
  suggestions?: string[];
  isLoading: boolean;
}

const Search: React.FC<ISearchProps> = ({
  onSearch = () => {},
  isLoading = false,
  suggestions = [],
}) => {
  const { searchQuery, onChange, setSearchQuery } = useUrlSyncQuery();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const showSuggestionsDropdown = () => {
    setShowSuggestions(true);
  };
  const hideSuggestions = () => {
    setShowSuggestions(false);
  };

  const handleSearchClick = (query: string) => {
    onSearch(query);
  };

  const handleSuggestionClick = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
    if (showSuggestions) hideSuggestions();
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (inputRef.current && !event.target.className.includes("suggestion")) {
        hideSuggestions();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onSearch(searchQuery);
  }, []);

  return (
    <form
      className="search-container"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchClick(searchQuery);
        hideSuggestions();
      }}
    >
      <div className="search-input-container">
        <input
          ref={inputRef}
          onFocus={showSuggestionsDropdown}
          className="search-input"
          type="text"
          placeholder="Enter city name"
          value={searchQuery}
          onChange={onChange}
        />
        {showSuggestions && (
          <SearchSuggestions
            suggestions={suggestions}
            onSelect={handleSuggestionClick}
          />
        )}
      </div>
      <div style={{ width: "20%" }}>
        <button
          disabled={isLoading}
          className="search-btn"
          onClick={() => handleSearchClick(searchQuery)}
          type="button"
        >
          Search
          <MagnifyingGlassIcon style={{ height: "16px" }} />
        </button>
      </div>
    </form>
  );
};

export default Search;
