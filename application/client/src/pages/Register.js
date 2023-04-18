import React from 'react';
import { Link } from 'react-router-dom';
import './Styling/register.scss';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
<<<<<<< HEAD
=======
import { useHistory } from 'react-router-dom';
import axios from 'axios';
>>>>>>> development/server

// import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  // toast.configure();


  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (userName.length < 6 || userName.length > 20) {
      errors.username = 'Username must be between 6 and 20 characters';

      toast.error('Username must be between 6 and 20 characters', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message',
      });
      console.log('Invalid Username');

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const errors = {};
    // if (userName.length < 6 || userName.length > 20) {
    //   errors.username = 'Username must be between 6 and 20 characters';

    //   // toast.error('Username must be between 6 and 20 characters', {
    //   //   position: toast.POSITION.TOP_CENTER,
    //   //   className: 'toast-message',
    //   // });
    //   console.log('Invalid Username');
    //   console.log(userName);
    // }

    // if (
    //   !password.match(
    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{\[\]\\:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_+~`|}{\[\]\\:;'<>,.?/]{8,20}$/
    //   )
    // ) {
    //   errors.password =
    //     'Password must be a combination letters, numbers, and special  with a maximum of 20 length';
    //   // toast.error(errors.password, {
    //   //   position: toast.POSITION.TOP_CENTER,
    //   //   className: 'toast-message',
    //   // });
    //   console.log('Invalid password');
    // }

    // if (
    //   !email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    // ) {
    //   errors.email = 'Please enter a valid email address';
    //   // toast.error(errors.email, {
    //   //   position: toast.POSITION.TOP_CENTER,
    //   //   className: 'toast-message',
    //   // });
    // }

    // if (Object.keys(errors).length > 0) {
    //   setValidationErrors(errors);
    //   // toast.error('Invalid Input', {
    //   //   position: toast.POSITION.TOP_CENTER,
    //   //   className: 'toast-message',
    //   // });
    // } else {
    //   console.log('created account successful');
    //   history.push('/login');
    // }

    try {
      e.preventDefault();
      const userData = {
        username: userName,
        password: password,
        email: email,
        // profile_picture: image
      };
     
      registerUser(userData)
        .then((userData) => console.log("DATA: " + userData))
        .then((err) => console.log("ERROR: " + err))

  } catch (error) {
      console.log("Error message: " + error.message);
  }
};

// register user api call
const registerUser = async (userData) => {
  try {
    const response = await fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    console.log(response);

    if (!response.ok) {
      console.log('response not ok');
      throw new Error('ERRRORRRR')

    }

    const data = await response.json()
    console.log("This is data after response: " + data);
    return data;


    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      // toast.error(errors.confirmPassword, {
      //   position: toast.POSITION.TOP_CENTER,
      //   className: 'toast-message',
      // });
    }

    if (
      !email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    ) {
      errors.email = 'Please enter a valid email address';
      // toast.error(errors.email, {
      //   position: toast.POSITION.TOP_CENTER,
      //   className: 'toast-message',
      // });
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      // toast.error('Invalid Input', {
      //   position: toast.POSITION.TOP_CENTER,
      //   className: 'toast-message',
      // });
    }

    // submit form
  };

  } catch (error) {
    console.error('Error while registering user:', error);
    throw error;
  }
};


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h2> Welcome to RecipeReel</h2>
          <div>
            <p>You already have an account?</p>
            <Link to="/login">
              <button>Login here</button>
            </Link>
          </div>
        </div>

        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              required={true}
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
