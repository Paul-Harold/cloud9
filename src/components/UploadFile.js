import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const UploadFile = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Upload File</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="button" onClick={handleFileUpload}>Upload</button>
      </form>
    </div>
  );
};

export default UploadFile;
