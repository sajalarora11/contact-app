import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AuthContext from "../../context/auth/Context";

const Navbar = ({ title, logo }) => {
  const authContext = useContext(AuthContext);

  const { isAuth, user, logout } = authContext;
  console.log("USER", user);
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={logo} /> {title}
      </h1>
      <ul>
        {isAuth === null || isAuth === false || user === null ? (
          <Fragment>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <Link to="/login">{user.name}</Link>{" "}
            </li>
            <li>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired
};

Navbar.defaultProps = {
  title: "ContactAPP",
  logo: "fas fa-id-card-alt"
};

export default Navbar;
