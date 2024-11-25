import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import UpdateAccount from './components/UpdateAccount';
import UploadFile from './components/UploadFile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/update"
          element={<PrivateRoute><UpdateAccount /></PrivateRoute>}
        />
        <Route
          path="/upload"
          element={<PrivateRoute><UploadFile /></PrivateRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
