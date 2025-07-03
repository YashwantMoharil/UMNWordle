import { useState } from 'react';
import '../styles/LoginUser.css';


type loginUserProps = {
  setIsAuth: (auth: boolean) => void;
};


function LoginUser({setIsAuth }: loginUserProps) {
  const [login, setLogin] = useState(true);

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    setIsAuth(true);
  };

  return (
    <>
      {login ? (
        <div className="wrapper">
          <div className="title">Login Form</div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <input type="text" required />
              <label>Email Address</label>
            </div>
            <div className="field">
              <input type="password" required />
              <label>Password</label>
            </div>
            <div className="field">
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
              Not a member?{" "}
              <a href="#" onClick={() => setLogin(false)}>
                Signup now
              </a>
            </div>
          </form>
        </div>
      ) : (
        <div className="wrapper">
          <div className="title">Sign Up</div>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <input type="text" required />
              <label>User Name</label>
            </div>
            <div className="field">
              <input type="text" required />
              <label>Email Address</label>
            </div>
            <div className="field">
              <input type="password" required />
              <label>Password</label>
            </div>
            <div className="field">
              <input type="submit" value="Sign Up" />
            </div>
            <div className="signup-link">
              Already a member?{" "}
              <a href="#" onClick={() => setLogin(true)}>
                Login
              </a>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default LoginUser;
