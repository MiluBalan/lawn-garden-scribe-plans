import { useState, useEffect } from 'react';

interface ZipcodeSuggestion {
  city: string;
  state: string;
  zipcode: string;
  formatted: string;
}

export const useZipcodeAutocomplete = (query: string) => {
  const [suggestions, setSuggestions] = useState<ZipcodeSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query || query.length < 1) {
        setSuggestions([]);
        return;
      }

      // Extract any digits from the query
      const digits = query.replace(/\D/g, '');
      
      if (digits.length === 0) {
        setSuggestions([]);
        return;
      }

      setLoading(true);

      try {
        // If we have 5 digits, try exact match
        if (digits.length === 5) {
          const response = await fetch(`https://api.zippopotam.us/us/${digits}`);
          if (response.ok) {
            const data = await response.json();
            const suggestions: ZipcodeSuggestion[] = data.places.map((place: any) => ({
              city: place['place name'],
              state: place['state abbreviation'],
              zipcode: data['post code'],
              formatted: `${place['place name']}, ${place['state abbreviation']} ${data['post code']}`
            }));
            setSuggestions(suggestions);
          } else {
            setSuggestions([]);
          }
        } else {
          // For partial input, use a fallback approach with common zipcodes
          // This could be enhanced with a more comprehensive API or local database
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching zipcode data:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return { suggestions, loading };
};
