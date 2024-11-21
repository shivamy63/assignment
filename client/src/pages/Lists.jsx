import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const Lists = () => {
  const [lists, setLists] = useState([]);

  const fetchLists = async () => {
    try {
      const { data } = await apiClient.get('/lists');
      setLists(data);
    } catch (error) {
      alert('Error fetching lists');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/lists/${id}`);
      fetchLists();
    } catch (error) {
      alert('Error deleting list');
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Your Lists</h2>
      <ul className="list-group">
        {lists.map((list) => (
          <li key={list._id} className="list-group-item">
            <div>
              <strong>{list.name}</strong>
              <button onClick={() => handleDelete(list._id)} className="btn btn-danger btn-sm float-end">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lists;
