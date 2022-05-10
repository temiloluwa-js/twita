import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "../styles/Register.module.css";
import image from "./2549395.jpg";
import logo from './onboarding.png'

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
          .then(setTimeout(() => setPending(false), 1500))
          .then(history("/register/create-profile-pic"))
          .catch((err) => console.log(err));
      }
    },
    validate,
  });

  return (
    <div className={styles.register_page}>
      <div className={styles.form_div}>
        
        <img src={image} className={styles.img} />

        <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
        </div>
          <div className={styles.form_details}>
            <div>
              <label htmlFor="firstName">First Name</label>
              {formik.touched.firstName && formik.errors.firstName && (
                <p className={styles.error}>{formik.errors.firstName}</p>
              )}
              <input
                type="text"
                id="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              {formik.touched.lastName && formik.errors.lastName && (
                <p className={styles.error}>{formik.errors.lastName}</p>
              )}
              <input
                type="text"
                id="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth">Date Of Birth</label>
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <p className={styles.error}>{formik.errors.dateOfBirth}</p>
              )}
              <input
                type="date"
                id="dateOfBirth"
                onChange={formik.handleChange}
                value={formik.values.dateOfBirth}
                onBlur={formik.handleBlur}
              />
            </div>

            <div>
              <label htmlFor="username">Username</label>
              {formik.touched.username && formik.errors.username && (
                <p className={styles.error}>{formik.errors.username}</p>
              )}
              <input
                type="text"
                id="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                onBlur={formik.handleBlur}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              {formik.touched.password && formik.errors.password && (
                <p className={styles.error}>{formik.errors.password}</p>
              )}
              <input
                type="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className={styles.error}>
                    {formik.errors.confirmPassword}
                  </p>
                )}
              <input
                type="password"
                id="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
              />
            </div>

            <div>
              {pending ? (
                <button className={styles.button}>Creating account...</button>
              ) : (
                <button type="submit" className={styles.button}>
                  REGISTER
                </button>
              )}
            </div>
          </div>
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
