import React from 'react';
import { Link } from 'react-router-dom';
import './Styling/register.scss';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  // const navigate = useNavigate();
  const handleSubmit = (e) => {
    //testing
    console.log(userName, password, confirmPassword, email);
    e.preventDefault();
    if (
      userName === '' ||
      password === '' ||
      confirmPassword === '' ||
      email === ''
    ) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      <Link to="/profile" />;
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h2> Welcome to RecipeReel</h2>
          <p>You already have an account?</p>
          <Link to="/login">
            <button>Login here</button>
          </Link>
        </div>

        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              id="userName"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
            />
            <input
              type="email"
              placeholder="Email@address.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
            <button className="submitBtn" onClick={handleSubmit}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
