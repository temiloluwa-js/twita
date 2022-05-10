import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css";
import image from "./2549395.jpg";
import logo from "./password.png";
const Login = () => {
  const history = useNavigate();
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:7000/persons")
      .then((response) => setPersons(response.data))
      .catch((err) => console.log(err));
  }, []);

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "please enter a valid username";
    } else if (!values.password) {
      errors.password = "please enter a valid password";
    }

    if (values.username) {
      console.log(persons);
      let personFound = persons.some(
        (person) => person.username == values.username
      );
      console.log(personFound);
      if (!personFound) {
        errors.username = "username not found";
      }
    }

    if (values.password) {
      let personFound = persons.some(
        (person) => person.password == values.password
      );
      if (!personFound) {
        errors.password = "incorrect password";
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      for (let i of persons) {
        if (i.username == values.username && i.password == values.password) {
          setPerson(i);
          localStorage.setItem("personInStorage", JSON.stringify(i));
          history("/");
        }
      }
    },
    validate,
  });

  return (
    <div className={styles.register_page}>
      <div className={styles.form_div}>
        <img src={image} className={styles.img} />
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.form}>
            <div className={styles.logo}>
              <img src={logo} alt="Login" />
            </div>
            <div className={styles.form_input}>
            <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <div className={styles.error}>{formik.errors.username}</div>
              )}
                          <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={styles.error}>{formik.errors.password}</div>
              )}
            </div>
            <div className={styles.submission}>
              <button type="submit" className={styles.button}>
                Log In
              </button>
              <p className={styles.p}>
                Do not have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
