import React, { useState, useContext, useEffect } from "react";

import ContactContext from "../../../../context/Contact/Context";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { current, addContacts, editContact } = contactContext;

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        country: "",
        phone: ""
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    country: "",
    phone: ""
  });

  const { name, email, phone, country } = contact;

  const onChange = event =>
    setContact({ ...contact, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();
    console.log("CURRENT", current);
    if (current) editContact(current);
    else addContacts(contact);
    setContact({
      name: "",
      email: "",
      country: "",
      phone: ""
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={onChange}
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={country}
        onChange={onChange}
      />
      <input
        type="submit"
        className="btn btn-dark btn-block"
        value={current ? "Update Contact" : "Add Contact"}
      />
    </form>
  );
};

export default ContactForm;
