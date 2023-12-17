import { useCallback, useEffect, useMemo, useState } from "react";
import debounced from "lodash.debounce";
import { WeatherInfo } from "../interfaces";

const CACHE_DIFF = 5 * 60 * 1000; //5 minutes of cache diff

const useWeatherInfo = () => {
  const [cache, setCache] = useState<
    Record<string, { data: WeatherInfo; fetchedAt: number }>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<WeatherInfo | undefined>();

  const fetchWeatherInfo = useCallback(
    async (city: string) => {
      if (city.length === 0) return;
      setIsLoading(true);
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      );
      const data = await resp.json();
      setCache((cache) => ({
        ...cache,
        [city]: {
          data: data,
          fetchedAt: Date.now(),
        },
      }));
      setData(data);
      setIsLoading(false);
      return data as WeatherInfo;
    },
    [setCache]
  );

  const handleSearch = useCallback(
    (city: string) => {
      const currentTime = Date.now();
      if (!!cache[city]) {
        const { fetchedAt } = cache[city];
        if (currentTime - fetchedAt < CACHE_DIFF) {
          return setData(cache[city].data);
        } else {
          return fetchWeatherInfo(city);
        }
      }
      return fetchWeatherInfo(city);
    },
    [cache, fetchWeatherInfo]
  );

  const debouncedHandleSearch = useMemo(() => {
    return debounced(handleSearch, 300);
  }, [handleSearch]);

  const prevSearchSuggestions = useMemo(() => {
    return Object.keys(cache);
  }, [cache]);

  useEffect(() => {
    // check if we already have some cache stored
    const savedCache = JSON.parse(window.localStorage.getItem("cache") ?? "{}");
    if (Object.keys(savedCache).length > 0) {
      setCache(savedCache);
    }
  }, []);

  // we need to sync cache with localStore
  useEffect(() => {
    window.localStorage.setItem("cache", JSON.stringify(cache));
  }, [cache]);

  return {
    onSearch: debouncedHandleSearch,
    isLoading,
    data,
    prevSearchSuggestions,
  };
};

export default useWeatherInfo;
