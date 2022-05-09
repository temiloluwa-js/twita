import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css";
import image from "./2549395.jpg";
const Login = () => {
  const history = useNavigate();
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState({});
  const [errorList, setErrorList] = useState(0);

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
      for (let i of persons) {
        if(i.username != values.username) {
          void(0)
        }
        console.log('found')
      }
    }

    if (values.password) {
      for (let i of persons) {
        if (i.password != values.password) {
          void(0)
        }
      }
      if (errorList == persons.length){
        errors.password = 'please enter a valid password'
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      if (formik.errors.length > 0) {
        void(0);
      } else {
        for (let i of persons) {
          if (i.username == values.username && i.password == values.password) {
            setPerson(i);
            localStorage.setItem("personInStorage", JSON.stringify(i));
            history("/");
          }
        }
      }
    },
    validate,
  });

  return (
    <div className={styles.loginpage}>
      <img src={image} className={styles.img} />
      <div className={styles.form_div}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <h1 className="h1">twita.</h1>
          
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <div className={styles.error}>{formik.errors.username}</div>
            )}
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{formik.errors.password}</div>
            )}
            <button type="submit" className={styles.button}>
              Log In
            </button>
            <p className={styles.p}>
              Do not have an account? <Link to="/register">Register</Link>
            </p>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
