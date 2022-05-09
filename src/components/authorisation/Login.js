import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css";
import image from "./2549395.jpg";
const Login = () => {
  const history = useNavigate();
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:7000/persons")
      .then((response) => setPersons(response.data))
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   setPersons(persons);
  // }, [persons]);

  const handleSubmit = (i) => {
    persons.length && i.preventDefault();
    console.log(persons);
    for (i of persons) {
      if (i.username == username && i.password == password) {
        console.log(i);
        setPerson(i);
        localStorage.setItem("personInStorage", JSON.stringify(i));
        console.log("Person found");
        history("/");
      }
    }
  };

  return (
    <div className={styles.loginpage}>
      <img src={image} className={styles.img} />
      <div className={styles.form_div}>

        <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="h1">twita.</h1>
          <div className={styles.form}>
            <label htmlFor="">Username</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className={styles.button}>Log In</button>
            <p className={styles.p}>
              Do not have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
