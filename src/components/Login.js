
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://3.107.178.30/api/auth/login', formData);
      alert(response.data.message);
      localStorage.setItem('token', response.data.token); // Save token for authentication
    } catch (error) {
      alert(error.response.data.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
