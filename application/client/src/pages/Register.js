import React from 'react';
import { Link } from 'react-router-dom';
import './Styling/register.scss';

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h2> Welcome to RecipeReel</h2>
          <p>You already have an account?</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>

        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm password" />
            <input type="email" placeholder="Email@address.com" />

            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
