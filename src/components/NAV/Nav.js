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
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVsAAACRCAMAAABaFeu5AAAAjVBMVEX////ZIy7XABT0ztDZISzYFCLXABfXAA7YFyXkc3j44uPmhormhIjyxMbXCx366urtpqn88vL43d/WAADvtLbWAAfokJTcPEXzyMrxvb/55ebgWmD99vbeUFfaLDbgXmTur7LrnaDlfIH209TiZmvbNT7ojZHqmZzeSlHibHLdQ0vso6bkd3zbMTrdS1IRREtqAAAH60lEQVR4nO2caXujKhSA1aLYtCExxixt2smeLpn7/3/e1Sxy2IxGnJnynPdbhaK8tQgcwPMQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBOmMB445ZcSvLh5ucMk3upUvJzlnTe4osrJO2oyLmXrnkg1ImzVVaCQNrqR9MYXRMuWTX+3xX9CSXvKtb+Qrsm7OWfvNi8wq68Qz0oBfDSkv8VH8hQQ8gZzWgoj4F+JPMcXnKeB2PepXQdgl33NYma+AXv4d+lF1vkwpksSVdXriGQm/+s34U2YL4RcOPMlPe80lGuBufemGrrlNMl5ktBR+IeQS4tfmDk0At9FYSHHNrbeN+WNOYf4xeABqr7mFbuM3IcU5t7MAlAk+z96UOyDv90g0ANz62QCmOOfWI7yu4RO/vAFVYsO7LOqBbtkKprjnFnyySMQvw7YikstqA3RLdjDFPbeDlBcazXVX4evcHuhWbIXcc+u98TeUf1z24Emzlzs1ahHcCn82B93OwZ1KjQH4mv+6V6MWwa3wzLfdMqqQ8UEUvwg1B/xyOS4DNY7UIum1yPZuYW3DyfnSEnbAqsfSTRHc+gHo3d10y4bJQOWSDyQlBy43GoGsl7EKcBvNNCVei7TglqeUZfwGHbCdWlYbRLfQ4k230ljDzJB/n6k8S+IJbulITS6x4HYExmbBaf5kBv4PpdFaa0S3BEyCuOjW+wKN67a48KurDpgnu4W+nHQLW9c0f5YX8CJfW2BrSG7BuNdJtwvQK2DfYncmHWhLux/JLbiBk269I2gD3gXV8hxre2S3xR/zjJtu4eQB3SzBxG22qVmd2shueT/ETbfeDrypRzgD9lWzNvWR3fJxr6NuQfjBj0Hla9emPorbcH9JcdRtAqZmADeKvAvFbfk4jrqFU4oAdqhZmQYobstxr6tuYfiBv1GZ5sHaorq9mnTVLQw/8Eofa9alCapbconpO+sWRsyvZFU3vhfV7XVK/m+4Df6E24H6NYs/alalERq3lxD9Tbfhvj+fz8cFyxOme9R3S1gECSjMZ8ut96p8zYK+Ll9bNG5Pkxh15sbDUgLLiVLTPeq7zWUICA6tuZ3LgQ59ttbo3J4DyU1jOuYpugZupSK7cQvX0Zwr/K3N1had2/O412G3IPxwykUX2mxt0bk9fzUddtvLhNuEz5XF3Q1wK8XpHHbrfQhvVGZv6aIAXCMqPpLLbuHqOqtLFwW423DCR9pFMNllt0JTGFhcumi4SbjnfZNiCOi0Wzhxywx5WgPcPnnZ9YfCk8tuYfTBD+yu+OAIbnmjkI9767kFHX0bbqVxmbCvwaJbYZ4RVs8qwO0zGLDEv+qsWUrTLDdg0S0b9kVgPntuB0IfrKvuregW/JR57zfXLHUwD1bVG7Lndi+OHawuaAaIbnmEmY13t9z+1DlGZcAk7n6wh+iWz8mT16mzbpfyx7OT2VvZLZjFAH9a19z+lsf54bpmTZohudUuSXbM7UzpRhKqydYeye1G1311zK06Nd7F4gRPcasP1Dnl9kWzQIF0HNM5u51oGgW33GqbPYu7eDmy21Gm3tgptwuqm7EuVxPZRHarfkQdczvURNDzjGHNujRBcbtS7+2UW9i5hBONHUR6Fbeapt4lt32wYomAdYxdTJArbqV4h2tuwdZI4o/h0mbbK/J1btUGySG38FPNDnBPpLhR3Aqq20TpKfx7bqvXalS4XcO9Iwn8kfg1a1Mf1a06bmngNtFtNrbu1ifbx+fJ4Xs87296A6VIs9tFBlrYo/gaW95w6mndjuVpIpPbYk3eojeazZeH/Xr7NvWjNNMtXLLv1o/jMGTstGSMZmnkf71t+T5vs1vYCTpNfoG4WZf7dEq3Su/a4JZMpyTIKC2Wg4VhHJN8vKwN7HXgVqRYORbyzbhmt7Bj8CY9mnwWUns0bpVV66aYDlEnH/6O29Od+QS3eY8/6IAFp5Ww8D2yHn7QuZXX+d1zfgLkn3ELdvNeP12foE/2u46wBujcelKj4IrbDeyAXZYuPgh7+eoYq4/W7aPYKLjiFr6jZWwXLoOzHH7QupW2sjjiFnbcuUbQdSCBZxWt24oTK36w24n21EW4l89y+EHvVqyGJbfF+hDdNq5+Gl5Ju3RrOHURnk5hN/ygdyuGzdq6XaV5Bz8LIhaTSON2tJ9ceaqaMFmnNAiic286704X/Wk4X3jLrenURTgzZnclrt6tMMt5023Rdb+Mk6huXDYoBqaL1j3zZDTabPrz8fI7HwYet29fO8KyfOwSnHSzW2MH46mL4H22G34wuBXCZjq3J52sGHNmKfW/Xj+fJ6tlPrzvZhWFmeRllPternLb5bVneholim7Npy6CutoNPxjcCmEzwW169kn+2x4nq3ExV2LzcazwsJoctx8kLd7p8qL51EUYDQjmcmEtMLgFRzgQwsAsRnIYzzaDjhb+WWYx2JSRmpc0Yte3WT51ER4laDP8YHK7YqT4nw8ojXev3Wy/+qMkm/5wsn7dhRkN5EN/4FfO5oFAJrcv6XT79D1+6P2MV7Q+i96D8n8PuvM2z1EoiyWso11WP4A1ja/dOZvbTyNy+t+nlH10tML3BzCYPP7HKC1aZGLxwPE0et8+DfvO/es3Z9HrD5+275m9r5nVw3SdoKNNkgiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCFPwPsgWfIuKWI2cAAAAASUVORK5CYII="
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
