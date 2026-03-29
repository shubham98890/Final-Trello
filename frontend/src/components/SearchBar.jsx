import { useState, useEffect } from 'react';
import { searchAPI } from '../services/api';

const SearchBar = ({ boardId, onSearch }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultCount, setResultCount] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (value) => {
    setQuery(value);
    if (!value.trim() || !boardId) {
      onSearch([]);
      setSuggestions([]);
      setResultCount(0);
      return;
    }

    try {
      setLoading(true);
      const response = await searchAPI.searchCards(boardId, value);
      const results = response.data || [];
      onSearch(results);
      setResultCount(results.length);
      
      // Show top suggestions
      setSuggestions(results.slice(0, 5));
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
      setResultCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    onSearch([]);
    setSuggestions([]);
    setResultCount(0);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    onSearch([suggestion]);
  };

  return (
    <div className="search-container" style={{ marginBottom: '2rem' }}>
      <div style={{ position: 'relative' }}>
        <div className="search-bar" style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem' }}>
            🔍
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search cards by title..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            disabled={loading}
            style={{ paddingLeft: '2.5rem', paddingRight: query ? '2.5rem' : '1rem' }}
          />
          {query && (
            <button
              onClick={handleClearSearch}
              style={{
                position: 'absolute',
                right: '0.8rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: '#999',
              }}
              title="Clear search"
            >
              ✕
            </button>
          )}
          {loading && (
            <div className="loading" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}></div>
          )}
        </div>

        {/* Live suggestions dropdown */}
        {query && suggestions.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'white',
              borderRadius: '0 0 8px 8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              marginTop: '-4px',
              paddingTop: '0.5rem',
              zIndex: 100,
            }}
          >
            <div style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#999' }}>
              Found {resultCount} result{resultCount !== 1 ? 's' : ''}
            </div>
            {suggestions.map((suggestion, idx) => (
              <div
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: '0.8rem 1rem',
                  borderBottom: idx < suggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#f8f9fa')}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                <div style={{ fontWeight: 500, color: '#333' }}>{suggestion.title}</div>
                {suggestion.description && (
                  <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.3rem' }}>
                    {suggestion.description.substring(0, 50)}...
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search stats */}
      {query && !loading && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#999' }}>
          {resultCount > 0
            ? `${resultCount} card${resultCount !== 1 ? 's' : ''} found matching "${query}"`
            : `No cards found matching "${query}"`}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
