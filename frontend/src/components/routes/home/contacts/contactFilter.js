import React, { useEffect, useRef, useContext } from "react";
import ContactContext from "../../../../context/Contact/Context";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef("");
  const { clearFilter, filterContact, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = event => {
    if (text.current.value !== "") {
      filterContact(event.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input type="text" placeholder="Search" ref={text} onChange={onChange} />
    </form>
  );
};

export default ContactFilter;
