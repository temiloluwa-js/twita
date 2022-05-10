import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "../styles/CreatePost.module.css";
import search_icon from "./logout.svg";

const CreatePost = () => {
  const history = useNavigate();
  const validate = (values) => {
    const errors = {};

    if (!values.postContent) {
      errors.postContent = "You have not entered anything to be posted";
    }
  };

  const personInStorage = JSON.parse(localStorage.getItem("personInStorage"));
  const date = new Date();
  const formik = useFormik({
    initialValues: {
      postContent: "",
      comments: "",
      likes: "",
      datePosted: date.getDate(),
      creator: personInStorage.username,
      creatorDp: personInStorage.profilePicUrl,
      creatorFirstName: personInStorage.firstName,
      creatorLastName: personInStorage.lastName,
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      if (formik.errors.length > 0) {
        void 0;
      } else {
        axios
          .post("http://localhost:3010/posts", values)
          .then(history("/"))
          .catch((err) => console.log(err));
      }
    },
    validate,
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.top_banner}>
          <Link to='/home' className={styles.link}><h1>twita.</h1></Link>
          <img src={search_icon} alt="search" className={styles.search_icon} />
        </div>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <textarea
            name="postContent"
            cols="30"
            rows="10"
            onChange={formik.handleChange}
            value={formik.values.postContent}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.postContent && formik.errors.postContent && (
            <p>{formik.errors.postContent}</p>
          )}
          <div className="submission">
            <button type="submit">Create Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
