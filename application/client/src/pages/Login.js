import React from 'react';
import './Styling/login.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const loginHandler = (e) => {
    e.preventDefault();
    // Perform validation
    if (email.trim() === '') {
      setError('Please enter your username');
      return;
    }

    if (password.trim() === '') {
      setError('Please enter your password');
      return;
    }

    //set request to backend
    fetch(`${process.env.REACT_APP_REQ_URL}user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful login
        console.log(data);
      })
      .catch((error) => {
        // Handle login error
        console.error('There was a problem with the login:', error);
      });
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Recipe Reel</h1>
          <span>
            Cooking is more than just preparing food
            <br />
            Sharing a meal with others
            <br />
            Building a healthier and happier lifestyle
            <br />
            <br />
          </span>
          <br />

          <span>
            <br />
            Don't you have an account?
          </span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={loginHandler}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
