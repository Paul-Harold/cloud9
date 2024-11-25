import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '', // Added username field
    email: '',
    password: ''
  });

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://3.107.178.30/api/auth/register', formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
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
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default Register;
