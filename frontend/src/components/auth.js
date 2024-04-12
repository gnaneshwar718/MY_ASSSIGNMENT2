import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login/', { username, password });
      console.log('Login successful:', response.data);
      
      // Save the access token to local storage
      localStorage.setItem('accessToken', response.data.access);

      // Redirect or perform other actions after successful login
    } catch (error) {
      setError(error.response.data.detail);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/register/', { username, password });
      console.log('Registration successful:', response.data);

      // Handle success case, e.g., show a success message
    } catch (error) {
      setError(error.response.data.detail);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    // Perform other logout actions, e.g., redirect to the login page
  };

  return { handleLogin, handleRegister, handleLogout, error }; // Exporting the functions and error state
};

export default Auth;
