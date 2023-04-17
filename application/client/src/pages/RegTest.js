import React from 'react'
import { useState } from 'react';
import './Styling/register.scss';
import axios from 'axios';
const RegTest = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [image, setImage] = useState(null);

    // function runs when user submits form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const userData = {
        username: userName,
        password: password,
        email: email,
        };
        console.log('response');
        const response = await registerUser(userData);

        console.log(response.message);

        if (response.message === 'User created successfully') {
            console.log('success');
        } else {
            console.log('failed');
        }
    } catch (error) {
        console.log("Error message: " + error.message);
    }
  };

  // register user api call
  const registerUser = async (userData) => {
    try {
      console.log('in register user');
      const response = await axios.post('user/register', userData);
      console.log('register User function');
      return response.data;
    } catch (error) {
      console.error('Error while registering user:', error);
      throw error;
    }
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

    return (
        <div className="register">
      <div className="card">
        <div className="left">
       
          </div>
        </div>

        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="profile-image">
              {image ? (
                <img src={image} alt="Profile" />
              ) : (
                <div className="default-image">
                  <i className="fa fa-user-circle" aria-hidden="true" />
                  <input
                    type="file"
                    accept="image/*"
                    onC
                    hang
                    e={(e) => handleImageUpload(e)}
                  />
                  <span>Upload your profile</span>
                </div>
              )}
            </div>

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
      );
}

export default RegTest