import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  DELETE_CONTACT,
  FILTER_CONTACT,
  FETCH_CONTACTS,
  SET_ALERT,
  SET_CURRENT,
  EDIT_CONTACT
} from "../types";

export default (state, action) => {
  console.log("state", state, "action", action);
  switch (action.type) {
    case ADD_CONTACT:
      console.log(action.payload);
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        )
      };

    case SET_ALERT:
      return {
        ...state,
        error: action.payload,
        contacts: []
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };

    case FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          console.log(action.payload);
          const regex = new RegExp(`${action.payload}`, "g");
          return contact.name.match(regex) || contact.email.match(regex);
        })
      };

    case EDIT_CONTACT:
      return {
        ...state,
        current: null,
        contacts: [...state.contacts, action.payload]
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };

    case FETCH_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      };

    default:
      return state;
  }
};
