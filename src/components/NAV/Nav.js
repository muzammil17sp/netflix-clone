import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { auth } from "../../firebase";
import "./nav.css";
function Nav() {
  const [show, handle] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const signoutUser = () => {
    auth.signOut().then(dispatch({ type: "SIGNOUT" }));
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handle(true);
      } else {
        handle(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", handle(false));
    };
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
        alt=" Netflix Logo"
      />
      <div className="dropdown">
        {user ? (
          <div className="dropdown">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              className="avatar dropdown"
            />

            <ul className="dropdown-content">
              <Link className="link" to="#">
                {user?.displayName}
              </Link>
              <li>
                <Link className="link" onClick={signoutUser} to="#signout">
                  Signout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signin">Sign In </Link>
        )}

     
      </div>
    </div>
  );
}

export default Nav;
