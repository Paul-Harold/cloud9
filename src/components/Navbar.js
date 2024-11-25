import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const Navbar = () => (
  <nav>
    <Link to="/register">Register</Link> | 
    <Link to="/login">Login</Link> | 
    <Link to="/update">Update Account</Link> | 
    <Link to="/upload">Upload File</Link>
  </nav>
);

export default Navbar;