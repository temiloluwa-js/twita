import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "../styles/Register.module.css";
import image from "./2549395.jpg";

const Register = () => {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7000/persons")
      .then((response) => setProfiles(response.data))
      .catch((err) => console.log(err));
  }, []);

  const validate = (values) => {
    const errors = {};

    if (values.username) {
      console.log("Breh");
      for (let i of profiles) {
        if (i["username"] == values.username) {
          errors.username = "username not available";
        }
      }
    } else if (!values.username) {
      errors.username = "enter your username";
      console.log(errors.username);
    }

    if (!values.firstName) {
      errors.firstName = "enter your first name";
    } else if (!values.lastName) {
      errors.lastName = "enter your last name";
    } else if (!values.dateOfBirth) {
      errors.dateOfBirth = "choose date of birth";
    } else if (!values.username) {
      errors.username = "enter your desired username";
    }

    if (!values.password) {
      errors.password = "enter a password";
    } else if (!values.confirmPassword) {
      errors.confirmPassword = "please confirm your password";
    }

    if (values.password != values.confirmPassword) {
      errors.confirmPassword = "input the correct password";
    }
    return errors;
  };
  const history = useNavigate();
  const [pending, setPending] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      username: "",
      password: "",
      confirmPassword: "",
      profilePicUrl: "",
    },
    onSubmit: (values) => {
      if (formik.errors.length > 0) {
        void 0;
      } else {
        setPending(true);
        const personInStorage = localStorage.getItem("personInStorage");
        personInStorage
          ? localStorage.setItem("personInStorage", JSON.stringify(values))
          : localStorage.setItem("personInStorage", JSON.stringify(values));
        axios
          .post("http://localhost:7000/persons", values)
          .then(setPending(false))
          .then(history("/register/create-profile-pic"))
          .catch((err) => console.log(err));
      }
    },
    validate,
  });

  return (
    <div className={styles.loginpage}>
        <div className={styles.form_div}>
        <img src={image} className={styles.img} />
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <h1>twita.</h1>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className={styles.error}>{formik.errors.firstName}</div>
              ) : null}
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className={styles.error}>{formik.errors.lastName}</div>
              )}
              <label htmlFor="dateOfBirth">Date Of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                onChange={formik.handleChange}
                value={formik.values.dateOfBirth}
                onBlur={formik.handleBlur}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <div className={styles.error}>{formik.errors.dateOfBirth}</div>
              )}

              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
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
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={styles.error}>{formik.errors.password}</div>
              )}
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className={styles.error}>
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
            {pending ? (
              <button className={styles.button}>Creating account...</button>
            ) : (
              <button type="submit" className={styles.button}>
                Register
              </button>
            )}
          </form>
        </div>

    </div>
  );
};

export default Register;
// const history = useNavigate();
// const [pending, setPending] = useState(false);
// const [person, setPerson] = useState({
//   firstName: "",
//   lastName: "",
//   age: "",
//   username: "",
//   password: "",
//   confirmPassword: "",
//   profilePicUrl: "",
// });

// const handleSubmit = (e) => {

//   e.preventDefault();
