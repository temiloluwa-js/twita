import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "../styles/CreatePost.module.css";
import search_icon from "./logout.svg";

const CreatePost = () => {
  const history = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("personInStorage");
    localStorage.removeItem("dpurl");
    history("/login");
  };

  const validate = (values) => {
    const errors = {};

    if (!values.postContent) {
      errors.postContent = "You have not entered anything to be posted";
    }
  };
  const personInStorage = JSON.parse(localStorage.getItem("personInStorage"));

  const [profilePic, setProfilePic] = useState('') 

  useEffect(() => {
    axios.get(`http://localhost:7000/persons?username=${personInStorage.username}`)
    .then(response => setProfilePic(response.data[0]["profilePicUrl"]))
    .catch(err => console.log(err))
  }, [validate])

  useEffect(() => {
    console.log(profilePic)
  }, [validate])


  const date = new Date();
  const formik = useFormik({
    initialValues: {
      postContent: "",
      comments: "",
      likes: "",
      datePosted: date.toLocaleString(),
      creator: personInStorage.username,
      creatorDp: profilePic && profilePic,
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
          <img src={search_icon} alt="search" className={styles.search_icon} onClick={handleLogOut} />
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
