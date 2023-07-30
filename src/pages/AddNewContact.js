import axios from "axios";
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function AddNewContact() {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    picture: "",
    dob: new Date(),
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
        .post("http://localhost:4000/contacts", data)
        .then(navigate("/"), window.location.reload(false));
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
            <option defaultValue={""}></option>
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
