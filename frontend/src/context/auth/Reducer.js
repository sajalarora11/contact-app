import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT,
  AUTH_ERROR
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        isAuth: false
      };

    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.data.token);
      return {
        ...state,
        isAuth: true,
        user: action.payload.data.user,
        token: action.payload.data.token
      };

    case LOGIN_FAIL || AUTH_ERROR:
      console.log("fail", state);
      return {
        ...state,
        isAuth: false,
        error: action.payload
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        isAuth: true,
        token: action.payload
      };

    case LOGOUT:
      delete localStorage.token;
      return {
        ...state,
        isAuth: false,
        user: null,
        token: null
      };

    case USER_LOADED:
      console.log("loaded", action);
      return {
        ...state,
        isAuth: true,
        user: action.payload
      };

    default:
      return state;
  }
};
