import React, { useState } from 'react';
import axios from 'axios';

const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/admin/login', { email, password });
      const { token } = response.data;
      // Store the token in local storage or a secure cookie
      // Redirect to the dashboard or perform other actions upon successful login
      console.log('Login successful', token);
      setErrorMessage('');
    } catch (error) {
      console.error('Login failed', error.response.data.error);
      // Handle login failure, show error message to the user, etc.
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default AdminLoginForm;

