"use client";

import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaSpinner, FaTimes, FaHistory, FaTag } from 'react-icons/fa';
import Link from 'next/link';

export default function SearchAutocomplete({ 
  onSearch, 
  placeholder = "Buscar artículos...",
  className = "" 
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Cargar búsquedas recientes del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Guardar búsquedas recientes
  const saveSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;
    
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Obtener sugerencias de búsqueda
  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce para las sugerencias
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Manejar clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      saveSearch(query.trim());
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title || suggestion);
    saveSearch(suggestion.title || suggestion);
    onSearch(suggestion.title || suggestion);
    setShowSuggestions(false);
  };

  const handleRecentSearchClick = (search) => {
    setQuery(search);
    onSearch(search);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className={`relative ${className}`} ref={suggestionsRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-12 bg-[#1B1F3B] border border-[#003B8D] rounded-lg text-white placeholder-[#A3A8CC] focus:outline-none focus:border-[#00C6FF] focus:ring-1 focus:ring-[#00C6FF]"
        />
        
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A3A8CC]" />
        
        {isLoading && (
          <FaSpinner className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#00C6FF] animate-spin" />
        )}
        
        {query && !isLoading && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#A3A8CC] hover:text-[#00C6FF] transition-colors"
          >
            <FaTimes />
          </button>
        )}
      </form>

      {/* Panel de sugerencias */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1B1F3B] border border-[#003B8D] rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Búsquedas recientes */}
          {recentSearches.length > 0 && !query && (
            <div className="p-4 border-b border-[#003B8D]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-[#00C6FF] flex items-center">
                  <FaHistory className="w-3 h-3 mr-2" />
                  Búsquedas recientes
                </h4>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-[#A3A8CC] hover:text-[#00C6FF] transition-colors"
                >
                  Limpiar
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="w-full text-left px-3 py-2 text-sm text-[#A3A8CC] hover:bg-[#0C0C2C] hover:text-white rounded-lg transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sugerencias */}
          {query && (
            <div className="p-4">
              {suggestions.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#00C6FF] mb-3">
                    Sugerencias
                  </h4>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left p-3 hover:bg-[#0C0C2C] rounded-lg transition-colors group"
                    >
                      <div className="flex items-start space-x-3">
                        <FaSearch className="w-3 h-3 text-[#A3A8CC] mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-sm text-[#A3A8CC] group-hover:text-white transition-colors">
                            {suggestion.title}
                          </div>
                          {suggestion.excerpt && (
                            <div className="text-xs text-[#A3A8CC]/70 mt-1 line-clamp-2">
                              {suggestion.excerpt}
                            </div>
                          )}
                          {suggestion.categories && suggestion.categories.length > 0 && (
                            <div className="flex items-center space-x-2 mt-2">
                              <FaTag className="w-2 h-2 text-[#A3A8CC]" />
                              <span className="text-xs text-[#A3A8CC]">
                                {suggestion.categories[0]}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="text-sm text-[#A3A8CC]">
                    No se encontraron sugerencias para "{query}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 