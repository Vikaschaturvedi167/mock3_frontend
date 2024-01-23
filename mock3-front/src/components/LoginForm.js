
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      
      const response = await axios.post('http://localhost:8000/login', loginData);

      console.log('Login successful', response.data);

      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
     
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>Email: </label>
      <input type="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
      <br />
      <label>Password: </label>
      <input type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/signup">Signup</Link></p>

      
      <Link to="/dashboard"><button>Go to Dashboard</button></Link>
    </div>
  );
};

export default Login;
