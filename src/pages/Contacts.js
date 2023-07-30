// import React, { useState } from "react";
import Contact from "../components/Contact";

export default function Contacts({ contacts }) {
  // const contactss = contacts
  //   const [contact, setContact] = useState(null);
  return (
    <div>
      {contacts.map((contact) => {
        return <Contact contact={contact} key={contact.id} />;
      })}
    </div>
  );
}
