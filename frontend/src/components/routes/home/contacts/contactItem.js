import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../../../context/Contact/Context";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { _id, name, email, phone, country } = contact;
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">{name}</h3>
      <ul>
        {email && <li>{email}</li>}
        {phone && <li>{phone}</li>}
        {country && <li>{country}</li>}
      </ul>
      <button className="btn-dark btn-sm" onClick={() => setCurrent(contact)}>
        Edit
      </button>
      <button className="btn-danger btn-sm" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
