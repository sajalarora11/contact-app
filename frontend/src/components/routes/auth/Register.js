import React, { useState, useContext, useEffect } from "react";

import AuthContext from "../../../context/auth/Context";

const Register = props => {
  const authContext = useContext(AuthContext);
  const { register, isAuth } = authContext;
  useEffect(() => {
    if (isAuth) props.history.push("/contacts");
    // eslint-disable-next-line
  }, [isAuth]);
  // eslint-disable-next-line

  const nameRE = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
  const emailRE = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  const passwordRE = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
  // eslint-disable-next-line

  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    err: ""
  });

  const { name, email, password, password2, err } = user;

  const onRegister = event => {
    event.preventDefault();
    console.log("DATA", { ...user });
    register(user);
    setuser({
      name: "",
      email: "",
      password: "",
      password2: "",
      err: ""
    });
  };

  const onChangeEmail = event => {
    if (emailRE.test(event.target.value)) {
      setuser({ ...user, err: "", [event.target.name]: event.target.value });
    } else if (event.target.value === "") {
      setuser({ ...user, err: "", [event.target.name]: event.target.value });
    } else {
      setuser({
        ...user,
        err: "Invalid Email",
        [event.target.name]: event.target.value
      });
    }
  };

  const onChangeName = event => {
    if (nameRE.test(event.target.value)) {
      setuser({ ...user, err: "", [event.target.name]: event.target.value });
    } else if (event.target.value === "") {
      setuser({ ...user, err: "", [event.target.name]: event.target.value });
    } else {
      setuser({
        ...user,
        err: "Invalid Name",
        [event.target.name]: event.target.value
      });
    }
  };

  const onChangePassword = event => {
    if (passwordRE.test(event.target.value)) {
      setuser({ ...user, err: "", [event.target.name]: event.target.value });
    } else if (event.target.value === "") {
      setuser({ ...user, err: "", [event.target.name]: event.target.value });
    } else {
      setuser({
        ...user,
        err:
          "Invalid Password. Password must have atleast one Upper Case one lowercase and numbers",
        [event.target.name]: event.target.value
      });
    }
  };

  const onChangePassword2 = event => {
    if (password === event.target.value) {
      setuser({ ...user, err: "", [event.target.name]: event.target.value });
    } else if (event.target.value === "") {
      setuser({ ...user, err: "", [event.target.name]: event.target.value });
    } else {
      setuser({
        ...user,
        err: "Passwords doesn't match",
        [event.target.name]: event.target.value
      });
    }
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      {err}
      <form onSubmit={onRegister}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChangeName} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChangePassword2}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-dark btn-block"
            value="Register"
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
