import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const [user, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const authHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password cannot be empty");
      return;
    }

    const name = e.target.name;
    setLoading((prevState) => ({ ...prevState, [name]: true }));

    try {
      let userInfo;
      if (name === 'signin') {
        userInfo = await signInWithEmailAndPassword(auth, email, password);
      } else if (name === 'signup') {
        userInfo = await createUserWithEmailAndPassword(auth, email, password);
      }
      dispatch({
        type: Type.SET_USER,
        user: userInfo.user,
      });
      setLoading((prevState) => ({ ...prevState, [name]: false }));
      navigate(location.state?.redirect || "/");
    } catch (err) {
      setError(err.message);
      setLoading((prevState) => ({ ...prevState, [name]: false }));
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
        {location?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {location?.state?.msg}
          </small>
        )}
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
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.login_signInButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.login_registerButton}
        >
          {loading.signUp ? <ClipLoader color="#000" size={15} /> : "Create your Amazon Account"}
        </button>
        {error && <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>}
      </div>
    </section>
  );
}

export default SignUp;
