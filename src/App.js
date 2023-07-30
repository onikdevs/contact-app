import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

import Nav from "../src/components/Nav";
import Contacts from "./pages/Contacts";
import AddNewContact from "./pages/AddNewContact";
import About from "./pages/About";
import ShowDetails from "./pages/ShowDeatails";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
// import contacts from "./data.json";

function App() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/contacts")
      .then(({ data }) => {
        setContacts(data);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Contacts contacts={contacts} />}></Route>
          <Route path="/addNewContact" element={<AddNewContact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/contacts/:id"
            element={<ShowDetails contacts={contacts} />}
          ></Route>
          <Route
            path="/contacts/:id/edit"
            element={<Edit contacts={contacts} />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
