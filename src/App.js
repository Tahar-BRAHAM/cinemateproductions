import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Home';
import About from './components/About';
import Services from './components/Services';
import Work from './components/Work';
import ContactUs from './components/ContactUs';
import Register from './components/Register';
import FollowMe from './components/FollowMe';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import Loader from './components/Loader';
import ComingSoon from './components/ComingSoon';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setAuthToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <LoadingWrapper setLoading={setLoading}>
        {loading && <Loader />}
        <Navbar authToken={authToken} logout={logout} />
        <FollowMe />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/maintenance" element={<ComingSoon />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/admin/login" element={authToken ? <Navigate to="/admin" /> : <Login setAuthToken={setAuthToken} />} />
          <Route path="/admin/register" element={authToken ? <Navigate to="/admin" /> : <Register setAuthToken={setAuthToken} />} />
          <Route path="/admin" element={authToken ? <AdminPage /> : <Navigate to="/admin/login" />} />
        </Routes>
      </LoadingWrapper>
    </Router>
  );
};

const LoadingWrapper = ({ setLoading, children }) => {
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [location, setLoading]);

  return children;
};

export default App;
