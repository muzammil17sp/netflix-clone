import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { auth } from "../../firebase";
import "./main.css";
const Main = () => {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    const userCheck = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: "USER", payload: authUser });
        history.push("/home");
      }
    });
    return () => {
      userCheck();
    };
  }, [user]);

  return (
    <div className="main">
      <div className="main_top">
        <img
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="Netflix "
        />
        <Link to="/login">
          <button>Sign In</button>
        </Link>
      </div>
      <div className="main_content">
        <h1>
          Unlimited movies, TV <br />
          shows, and more.
        </h1>
        <h3>Watch anywhere. Cancel anytime.</h3>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="main_registered">
          <input type="text" placeholder="Email Address" />
          <button>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
