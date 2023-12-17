import React from "react";

interface ISearchSuggestionsProps {
  suggestions: string[];
  onSelect: (name: string) => void;
}
const SearchSuggestions: React.FC<ISearchSuggestionsProps> = ({
  suggestions = [],
  onSelect,
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="search-suggestions">
      <ul>
        {suggestions.map((suggestion) => {
          return (
            <li
              className="suggestion"
              key={suggestion}
              onClick={(e) => {
                e.preventDefault();
                onSelect(suggestion);
              }}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchSuggestions;
