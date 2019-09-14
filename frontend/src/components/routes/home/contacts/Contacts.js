import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ContactContext from "../../../../context/Contact/Context";
import ContactItem from "./contactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, fetchContacts } = contactContext;
  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, []);
  console.log("CONTACTS", contacts);
  if (contacts === null || contacts.length < 1)
    return <h4>No contacts found</h4>;
  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map(contact => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map(contact => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
