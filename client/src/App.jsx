import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Lists from './pages/Lists';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
      <Route path="/lists" element={<ProtectedRoute><Lists /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
