import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./Context";
import AuthReducer from "./Reducer";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT
} from "../types";

const AuthState = props => {
  const initialState = {
    isAuth: null,
    token: localStorage.getItem("token"),
    error: null,
    loading: true,
    user: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Methods
  const register = async formData => {
    try {
      const config = {
        headers: {
          "Context-Type": "application/json"
        }
      };
      if (formData) {
        const res = await axios.post("/api/user/register", formData, config);
        if (res.error) {
          dispatch({ type: REGISTER_FAIL, payload: res.message });
        } else {
          dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadUser = async () => {
    console.log("LOADED USER CALLED");
    try {
      const config = {
        headers: {
          "Context-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };
      const res = await axios.get("/api/user/", config);
      if (res.data.error)
        dispatch({ type: AUTH_ERROR, payload: res.data.message });
      else dispatch({ type: USER_LOADED, payload: res.data.user });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    dispatch({ type: LOGOUT, payload: null });
  };

  const login = async formdata => {
    try {
      const config = {
        headers: {
          "Context-Type": "application/json"
        }
      };
      const res = await axios.post("/api/user/login", formdata, config);
      if (res.data.error)
        dispatch({ type: LOGIN_FAIL, payload: res.data.message });
      else {
        localStorage.setItem("token", res.token);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: state.isAuth,
        token: state.token,
        loading: state.loading,
        error: state.error,
        user: state.user,
        register,
        login,
        loadUser,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
