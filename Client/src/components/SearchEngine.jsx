import React from "react";

function SearchEngine({ query, setQuery, search }) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            search(e);
        }
    };

    return (
        <div className="SearchEngine">
            <input
                type="text"
                className="search-bar"
                placeholder="Enter city name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button onClick={search} className="search-button">Search</button>
        </div>
    );
}

export default SearchEngine;
