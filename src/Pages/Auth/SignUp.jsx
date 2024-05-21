import React, { useState, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import classes from "./SignUp.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { ClipLoader } from "react-spinners";

const Type = {
  SET_USER: "SET_USER"
};

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false }); // Fixed syntax error

  const [user, dispatch] = useContext(DataContext);
  const navigate=useNavigate();
  console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();

    if (e.target.name === 'signin') {
      // Sign In logic
      setLoading({ ...loading, signIn: true }); // Start loading
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false }); // Stop loading
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false }); // Stop loading
          navigate("/");
        });
    } else if (e.target.name === 'signup') {
      // Sign Up logic
      setLoading({ ...loading, signUp: true }); // Start loading
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false }); // Stop loading
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false }); // Stop loading
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button type="submit" name="signin" onClick={authHandler} className={classes.login_signInButton}>
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>
        <button type="submit" name="signup" onClick={authHandler} className={classes.login_registerButton}>
          {loading.signUp ? <ClipLoader color="#000" size={15} /> : "Create your Amazon Account"}
        </button>
        {error && <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>}

      </div>
    </section>
  );
}

export default SignUp;
