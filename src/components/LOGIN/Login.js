import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { auth } from "../../firebase";
import "./login.css";
const Login = () => {
  const [{  }, dispatch] = useStateValue();
  const [Signup, setSignup] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [fullName, setfullName] = useState("");
  const history = useHistory();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (Signup) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          let completeUser = user.user.updateProfile({
            displayName: fullName,
          });
          dispatch({ type: "USER", payload: user.user });
          history.push("/home");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (!Signup) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          dispatch({ type: "USER", payload: user.user });
          history.push("/home");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  
 
  return (
    <div className="login">
      <div className="login_form">
        <img
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          className="login_logo"
          alt="Netflix "
        />

        <form className="login_input" onSubmit={onSubmitHandler}>
          <h1>Sign In</h1>
          {Signup && (
            <input
              type="text"
              placeholder="Full name"
              onChange={(e) => setfullName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className="login_btn" type="submit">
            Sign In
          </button>
        </form>
        <div className="login_other">
          {Signup ? (
            <p>
              Already registered?{" "}
              <Link onClick={() => setSignup(!Signup)}>Sign In now.</Link>
            </p>
          ) : (
            <p>
              New to Netflix?{" "}
              <Link onClick={() => setSignup(!Signup)}>Sign up now.</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
