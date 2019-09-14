import React, { useReducer } from "react";
import AlertContext from "./Context";
import AlertReducer from "./Reducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const ALertState = props => {
  const initialState = {
    msg: ""
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = text => {
    dispatch({ type: SET_ALERT, payload: text });
  };

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: null }), 500);

  return (
    <AlertContext
      value={{
        msg: state.msg,
        setAlert: state.setAlert
      }}
    >
      {props.children}
    </AlertContext>
  );
};

export default ALertState;
