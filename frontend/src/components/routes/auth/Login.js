import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/auth/Context";

const Login = props => {
  const authContext = useContext(AuthContext);

  const { login, isAuth } = authContext;
  console.log("ISAUTH", isAuth);
  useEffect(() => {
    if (isAuth) {
      props.history.push("/contacts");
    }
    // eslint-disable-next-line
  }, [isAuth, props.history]);

  const [user, setuser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const loginUser = event => {
    event.preventDefault();
    login({ email, password });
    setuser({ email: "", password: "" });
  };

  const onChange = event => {
    setuser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-dark btn-block"
            value="Login"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
