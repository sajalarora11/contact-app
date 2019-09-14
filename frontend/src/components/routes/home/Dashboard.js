import React, { useContext, useEffect } from "react";

import Contacts from "./contacts/Contacts";
import ContactForm from "./contacts/contactForm";
import ContactFilter from "./contacts/contactFilter";
//import ContactContext from "../../../context/Contact/Context";
import AuthContext from "../../../context/auth/Context";

const Home = () => {
  //const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      {/* Contact form */}
      <div>
        <ContactForm />
      </div>
      {/* Contact List */}
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
