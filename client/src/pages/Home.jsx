import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/authHelpers';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to ResponseCodeApp</h1>
      {!isAuthenticated() ? (
        <div>
          <p>Please log in to access the features of this app.</p>
          <Link className="btn btn-primary" to="/login">Login</Link>
          <Link className="btn btn-secondary ms-2" to="/signup">Signup</Link>
        </div>
      ) : (
        <div>
          <p>Welcome back! You are logged in.</p>
          <Link className="btn btn-primary" to="/search">Search</Link>
          <Link className="btn btn-secondary ms-2" to="/lists">View Lists</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
