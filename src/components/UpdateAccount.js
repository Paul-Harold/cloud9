import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const UpdateAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://3.107.178.30/api/auth/update',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Update Account</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="New Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="New Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <button type="button" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};

export default UpdateAccount;
