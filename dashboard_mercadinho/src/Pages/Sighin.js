import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';

const Sighin = ({ onLoginSuccess }) => {
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleSubmit = (event) => {
    event.preventDefault();

    const validCredentials = username === 'admin' && password === 'admin';

    if (!validCredentials) {
      console.error('Invalid login credentials.');
      return; // Early return if credentials are invalid
    }

    setIsLoggedIn(true);
    onLoginSuccess(true); // Pass login status to parent (App.js)

    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      {isLoggedIn ? (
        <p>Successfully logged in!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      )}
    </div>
  );
};

export default Sighin;
