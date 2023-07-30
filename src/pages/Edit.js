import axios from "axios";
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// import Contact from "../components/Contact";

export default function Edit({ contacts }) {
  const id = useParams().id;
  const contact = contacts.find((contact) => contact.id === +id);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [data, setData] = useState({
    first_name: contact?.first_name,
    last_name: contact?.last_name,
    email: contact?.email,
    gender: contact?.gender,
    picture: contact?.picture,
    dob: new Date(contact?.dob),
  });

  const handleChange = (e) => {
    setData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  const saveData = (e) => {
    if (
      data.first_name === "" ||
      data.last_name === "" ||
      data.email === "" ||
      data.gender === "" ||
      data.picture === ""
    ) {
      setErr("please fill all the fields");
    } else {
      axios
        .put(`http://localhost:4000/contacts/${id}`, data)
        .then(navigate(`/contacts/${id}`), window.location.reload(false));
    }
    e.preventDefault();
  };
  const handleDateChange = (date) => {
    setData((prevData) => {
      return { ...prevData, dob: date };
    });
  };

  return (
    <>
      <form style={{ width: "450px", margin: "auto" }} onSubmit={saveData}>
        {err && <div className="my-3 form-control is-invalid">{err}</div>}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            first Name
          </label>
          <input
            type="text"
            value={data.first_name}
            name="first_name"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            last Name
          </label>
          <input
            type="text"
            value={data.last_name}
            name="last_name"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={data.email}
            name="email"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select name="gender" className="form-select" onChange={handleChange}>
            <option defaultValue={data.gender}></option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="picture" className="form-label">
            Picture
          </label>
          <input
            type="text"
            value={data.picture}
            name="picture"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 d-flex flex-column">
          <label htmlFor="dob" className="form-label">
            Date of Birth
          </label>
          <DatePicker
            className="w-100 form-control"
            showMonthDropdown="true"
            showYearDropdown="true"
            dropdownMode="select"
            maxDate={new Date()}
            selected={data.dob}
            onChange={handleDateChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-25">
          Save
        </button>
      </form>
    </>
  );
}
