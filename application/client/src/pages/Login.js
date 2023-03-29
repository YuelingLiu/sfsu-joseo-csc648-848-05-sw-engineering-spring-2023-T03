import './Styling/login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Recipe Reel</h1>
          <span>
            Cooking is more than just preparing food.
            <br />
            Sharing a meal with others
            <br />
            <br /> Building a healthier and happier lifestyle.
          </span>
          <p>Don't you have an account?</p>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
