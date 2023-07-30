import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ShowDetails({ contacts }) {
  // const [contact, setContact] = useState({});
  const id = useParams().id;
  const contact = contacts.find((contact) => contact.id === +id);
  const navigate = useNavigate();
  // const dob = contact?.dob?.date.slice(0, 10);
  const handleDelete = () => {
    axios
      .delete(`http://localhost:4000/contacts/${id}`)
      .then(navigate("/"), window.location.reload(false));
  };

  return (
    <>
      <div className="card mx-auto w-50">
        <div className="card-body">
          <img src={contact?.picture} alt="profile-pic" />
          <div className="card-title d-flex gap-2 justify-content-center mt-2">
            <h5>{contact?.first_name}</h5>
            <h5>{contact?.last_name}</h5>
          </div>
          <div className="card-text">
            <p>Email: {contact?.email}</p>
            <p>Gender: {contact?.gender}</p>
            <p>DOB: {dayjs(contact?.dob).format("DD / MM / YYYY")}</p>
          </div>
        </div>
        <Link
          to={`/contacts/${contact?.id}/edit`}
          className="btn btn-secondary mb-3 w-25 mx-auto"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="btn btn-danger mb-3 w-25 mx-auto"
        >
          Delete
        </button>
        {/* <button
          onClick={() => navigate("")}
          className="btn btn-dark w-50 mx-auto"
        >
          Go Back
        </button> */}
      </div>
    </>
  );
}

export default ShowDetails;
