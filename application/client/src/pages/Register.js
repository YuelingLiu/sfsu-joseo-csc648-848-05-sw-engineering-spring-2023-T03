import React from 'react';
import { Link } from 'react-router-dom';
import './Styling/register.scss';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// import { useNavigate } from 'react-router-dom';
const Register = () => {
  const history = useHistory();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  // toast.configure();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const formData = new FormData();
      formData.append('username', userName);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('profile_picture', image);

      console.log('This is image: ' + image);

      registerUser(formData)
        .then((userData) => {
          console.log('DATA: ', userData);
        })
        .catch((error) => {
          console.log('ERROR: ', error);
        });
    } catch (error) {
      console.log('Error message: ' + error.message);
    }
  };

  const registerUser = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_REQ_URL}/user/register`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        console.log('response not ok');
        throw new Error('Response ERROR');
      }

      const data = await response.json();
      console.log('This is data after response: ' + data);
      return data;
    } catch (error) {
      console.error('Error while registering user:', error);
      throw error;
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <Link className="welcome" to="/">
            <h2> Welcome to RecipeReel</h2>
          </Link>

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
            <div className="profile-image">
              {image === null ? (
                <div className="default-image">
                  <i className="fa fa-user-circle" aria-hidden="true" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                  />
                  <span>Upload your profile</span>
                </div>
              ) : (
                <img src={URL.createObjectURL(image)} alt="Uploaded profile" />
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
    </div>
    // <div className="default-image">
    //   <i className="fa fa-user-circle" aria-hidden="true" />
    //   <input
    //     type="file"
    //     accept="image/*"
    //     onChange={(e) => handleImageUpload(e)}
    //   />
    //   <span>Upload your profile</span>
    //   {image === null ? (
    //     <i className="fa fa-user-circle" aria-hidden="true" />
    //   ) : (
    //     <img src={URL.createObjectURL(image)} alt="Uploaded profile" />
    //   )}

    // </div>
  );
};

export default Register;
