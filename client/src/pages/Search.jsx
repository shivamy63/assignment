import React, { useState } from 'react';
import apiClient from '../api/apiClient';

const Search = () => {
  const [filter, setFilter] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await apiClient.get(`/lists/fetch-codes?filter=${filter}`);
      setResults(data.codes);
    } catch (error) {
      alert('Error fetching codes');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Search Codes</h2>
      <div className="mb-3">
        <label className="form-label">Filter</label>
        <input
          type="text"
          className="form-control"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <button onClick={handleSearch} className="btn btn-primary mb-3">Search</button>
      <ul className="list-group">
        {results.map((result, index) => (
          <li key={index} className="list-group-item">
            <strong>{result.code}:</strong> <img src={result.data.image.jpg} alt={result.code} width="50" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
