import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    username: "",
    password: "",
    confirmPassword: "",
    profilePicUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const [pending, setPending] = useState(true);

    localStorage.setItem("person", person);
    axios
      .post("http://localhost:7000/persons", person)
      .then(setPending(false))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form className="register" onSubmit={handleSubmit}>
        <div>
          <p>Names</p>
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
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              onChange={(e) => setPerson({ ...person, age: e.target.value })}
            />
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              onChange={(e) => setPerson({ ...person, gender: e.target.value })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
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
        </div>
        <button type="submit">Submit</button>
        {pending && <button>Loading...</button>}
      </form>
    </div>
  );
};

export default Register;
