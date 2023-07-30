import React from "react";
import { Link } from "react-router-dom";

export default function Contact({ contact }) {
  return (
    <div className="card mx-auto w-50 mb-3">
      <div className="card-body">
        {/* <img src={contact.picture} alt="profile-pic" /> */}
        <div className="card-title d-flex gap-2 justify-content-center mt-2">
          <h5>{contact.last_name}</h5>
          <h5>{contact.first_name}</h5>
        </div>
        <div className="card-text">
          <p>Email: {contact.email}</p>
          {/* <p>Gender: {contact.gender}</p> */}
          {/* <p>DOB: {contact.dob}</p> */}
        </div>
        <Link to={`contacts/${contact?.id}`} className="btn btn-secondary w-25">
          Show Details
        </Link>
      </div>
    </div>
  );
}
