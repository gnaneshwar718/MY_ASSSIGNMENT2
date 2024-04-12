import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Auth from './Auth'; // Import the Auth component to access its functions

const useStyles = makeStyles({
  homeContainer: {
    textAlign: 'center',
    paddingTop: '50px',
  },
  ctaButtons: {
    marginTop: '30px',
    '& > *': {
      margin: '10px',
    }
  },
});

const Home = () => {
  const classes = useStyles();
  const { handleLogin, handleRegister, handleLogout } = Auth(); // Destructure the functions from the returned object

  return (
    <div className={classes.homeContainer}>
      <h1>Welcome to Our Social Media Platform</h1>
      <p>Share your thoughts, moments, and stories with the world.</p>
      <div className={classes.ctaButtons}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="outlined" color="primary" onClick={handleRegister}>
          Register
        </Button>
        <Button component={Link} to="/posts/create" variant="contained" color="primary">
          Create a Post
        </Button>
        <Button component={Link} to="/analytics" variant="outlined" color="primary">
          View Analytics
        </Button>
        <Button component={Link} to="/postslist" variant="outlined" color="primary">
          Post List
        </Button>
        <Button variant="outlined" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Home;