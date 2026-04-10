import { useState, useMemo, useRef, useCallback, useEffect } from "react";

/**
 * useGameSearch - Reusable hook for game search functionality
 * 
 * @param {Array} games - Array of game objects to search
 * @param {Array} searchFields - Fields to search in (default: ["title", "category", "description"])
 * @returns {Object} { searchQuery, setSearchQuery, filteredGames, resultCount }
 * 
 * Example Usage:
 * const { searchQuery, setSearchQuery, filteredGames } = useGameSearch(games, ["title", "category"]);
 */
export const useGameSearch = (games = [], searchFields = ["title", "category", "description"]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) return games;

    const query = searchQuery.toLowerCase();
    return games.filter((game) => {
      return searchFields.some((field) => {
        const fieldValue = game[field];
        return fieldValue && fieldValue.toLowerCase().includes(query);
      });
    });
  }, [searchQuery, games, searchFields]);

  return {
    searchQuery,
    setSearchQuery,
    filteredGames,
    resultCount: filteredGames.length,
    hasResults: filteredGames.length > 0,
  };
};

/**
 * useGameFilter - Advanced filtering with search + category + price
 * 
 * @param {Array} games - Array of game objects
 * @returns {Object} All filtering methods and states
 */
export const useGameFilter = (games = []) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("relevance");

  const filteredGames = useMemo(() => {
    let result = games;

    // 1. Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (game) =>
          game.title.toLowerCase().includes(query) ||
          game.category.toLowerCase().includes(query) ||
          game.description.toLowerCase().includes(query)
      );
    }

    // 2. Category filter
    if (selectedCategory !== "All") {
      result = result.filter((game) => game.category === selectedCategory);
    }

    // 3. Price filter
    result = result.filter(
      (game) => game.price >= priceRange[0] && game.price <= priceRange[1]
    );

    // 4. Sort
    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "title") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, sortBy, games]);

  // Get available categories
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(games.map((g) => g.category))];
    return cats;
  }, [games]);

  // Get price range limits
  const maxPrice = useMemo(() => {
    return Math.max(...games.map((g) => g.price || 0), 100);
  }, [games]);

  return {
    // States
    searchQuery,
    selectedCategory,
    priceRange,
    sortBy,

    // Setters
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    setSortBy,

    // Results
    filteredGames,
    resultCount: filteredGames.length,
    hasResults: filteredGames.length > 0,

    // Metadata
    categories,
    maxPrice,

    // Reset all filters
    reset: () => {
      setSearchQuery("");
      setSelectedCategory("All");
      setPriceRange([0, maxPrice]);
      setSortBy("relevance");
    },
  };
};

/**
 * useDebounceSearch - Search with debouncing (for API calls)
 * Useful when calling backend API to avoid too many requests
 * 
 * @param {Function} searchFn - Function to call (e.g., API endpoint)
 * @param {Number} delay - Debounce delay in ms (default: 300)
 * @returns {Object} { query, setQuery, results, isLoading, error }
 */
export const useDebounceSearch = (searchFn, delay = 300) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce timer
  const timeoutRef = useRef(null);

  const handleSearch = useCallback(
    (value) => {
      setQuery(value);

      // Clear previous timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Show loading immediately
      if (value.trim()) {
        setIsLoading(true);
        setError(null);

        // Wait before calling API
        timeoutRef.current = setTimeout(async () => {
          try {
            const data = await searchFn(value);
            setResults(data);
            setIsLoading(false);
          } catch (err) {
            setError(err.message);
            setIsLoading(false);
          }
        }, delay);
      } else {
        setResults([]);
        setIsLoading(false);
      }
    },
    [searchFn, delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    search: handleSearch,
  };
};
