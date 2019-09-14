import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./Context";
import contactReducer from "./Reducer";
import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  SET_CURRENT,
  SET_ALERT,
  EDIT_CONTACT,
  CLEAR_FILTER,
  DELETE_CONTACT,
  FETCH_CONTACTS,
  FILTER_CONTACT
} from "../types";

//import contactContext from "./Context";

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: ""
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  const addContacts = async contact => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };
      const res = await axios.post("/api/contact/", contact, config);
      if (!res.data.error)
        dispatch({ type: ADD_CONTACT, payload: res.data.contact });
      else dispatch({ type: SET_ALERT, paylaod: res.data.message });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchContacts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };
      const res = await axios.get("/api/contact/", config);
      if (res.data.error)
        dispatch({ type: SET_ALERT, payload: res.data.message });
      else dispatch({ type: FETCH_CONTACTS, payload: res.data.contacts });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = async _id => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };
      console.log("_ID", _id);
      const res = await axios.delete(`/api/contact/${_id}`, config);
      console.log("ONDELETE", res);
      if (!res.data.error) dispatch({ type: DELETE_CONTACT, payload: _id });
      else dispatch({ type: SET_ALERT, payload: res.data.message });
    } catch (err) {
      console.log(err);
    }
  };

  const editContact = async contact => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };
      const res = await axios.patch(
        `/api/contact/${contact._id}`,
        contact,
        config
      );
      console.log("EDITED", res.data);
      if (!res.data.error)
        dispatch({ type: EDIT_CONTACT, payload: res.data.contact });
      else dispatch({ type: SET_ALERT, payload: res.data.message });
    } catch (err) {
      console.log(err);
    }
  };

  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = contact => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterContact = text => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER, payload: null });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContacts,
        deleteContact,
        setCurrent,
        clearCurrent,
        clearFilter,
        filterContact,
        fetchContacts,
        editContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
