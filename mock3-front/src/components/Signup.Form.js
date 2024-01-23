import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSignup = async () => {
    try {
      
      const response = await axios.post('http://localhost:8000/signup', signupData);

      console.log('Signup successful', response.data);

     
      navigate('/login');
    } catch (error) {
      console.error('Signup failed', error);
      
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <label>Name: </label>
      <input type="text" value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} />
      <br />
      <label>Email: </label>
      <input type="email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
      <br />
      <label>Password: </label>
      <input type="password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
      <br />
      <button onClick={handleSignup}>Signup</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
