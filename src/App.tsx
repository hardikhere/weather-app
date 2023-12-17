import Search from "./components/Search";
import Spinner from "./components/Spinner";
import WeatherDetails from "./components/WeatherDetails";
import useWeatherInfo from "./hooks/useWeatherInfo";
import "./App.css";

function App() {
  const {
    onSearch: onDebouncedSearch,
    isLoading,
    data,
    prevSearchSuggestions,
  } = useWeatherInfo();

  return (
    <div className="background">
      <div className="card">
        <Search
          suggestions={prevSearchSuggestions}
          onSearch={onDebouncedSearch}
          isLoading={isLoading}
        />

        <div
          className={`transition-container spinner-container ${
            isLoading && data ? "visible" : "hidden"
          }`}
        >
          {isLoading && <Spinner />}
        </div>

        <div
          className={`transition-container ${
            !isLoading && data ? "visible" : "hidden"
          }`}
        >
          {data && <WeatherDetails {...data} />}
        </div>
      </div>
    </div>
  );
}

export default App;
