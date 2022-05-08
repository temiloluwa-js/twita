import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/Register.css";
import image from "./2549395.jpg";
const Register = () => {
  const history = useNavigate();
  const [pending, setPending] = useState(false);
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    age: "",
    username: "",
    password: "",
    confirmPassword: "",
    profilePicUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const personInStorage = localStorage.getItem("personInStorage");
    personInStorage
      ? localStorage.setItem("personInStorage", JSON.stringify(person))
      : localStorage.setItem("personInStorage", JSON.stringify(person));
    axios
      .post("http://localhost:7000/persons", person)
      .then(setPending(false))
      .then(history("/register/create-profile-pic"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="loginpage">
      <img src={image} className="img" />
      <div className="form-div">
        <form className="register" onSubmit={handleSubmit}>
          <h1>twita.</h1>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              onChange={(e) =>
                setPerson({ ...person, firstName: e.target.value })
              }
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              onChange={(e) =>
                setPerson({ ...person, lastName: e.target.value })
              }
            />
            <label htmlFor="age">Age</label>
            <input
              type="number"
              onChange={(e) => setPerson({ ...person, age: e.target.value })}
            />

            <label htmlFor="username">Username</label>
            <input
              type="text"
              onChange={(e) =>
                setPerson({ ...person, username: e.target.value })
              }
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) =>
                setPerson({ ...person, password: e.target.value })
              }
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              onChange={(e) =>
                setPerson({ ...person, confirmPassword: e.target.value })
              }
            />
          </div>
          {pending ? <button>Loading...</button> : <button>Register</button>}
        </form>
      </div>
    </div>
  );
};

export default Register;
