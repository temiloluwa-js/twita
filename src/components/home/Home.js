import React from "react";
import { useNavigate } from "react-router";
import styles from "../styles/Banner.module.css";
import logo from "./twita..png";
import search_icon from "./logout.svg";
import { Link } from "react-router-dom";
import PostList from "./PostList";

const Home = () => {
  const person = JSON.parse(localStorage.getItem("personInStorage"));
  const dpurl = localStorage.getItem("dpurl");
  const history = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("personInStorage");
    localStorage.removeItem("dpurl");
    history("/login");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.top_banner}>
          <Link to='/home' className={styles.homelink}><h1>twita.</h1></Link>
          <img src={search_icon} alt="search" className={styles.search_icon} onClick={handleLogOut}/>
        </div>
        <div className={styles.bottom_banner}>
          <div className={styles.dp}>
            {person.profilePicUrl ? (
              <img
                src={person.profilePicUrl}
                alt="Profile Picture"
                width="200px"
                height="200px"
              />
            ) : (
              <img
                src={dpurl}
                alt="Profile Picture"
                width="200px"
                height="200px"
              />
            )}
          </div>
          <div className="make_a_post">
            {person && (
              <Link to="/create_post" className={styles.link}>
                <h1>What's on your mind {person.firstName}?</h1>
              </Link>
            )}
          </div>
        </div>

        <PostList className={styles.posts} />
      </div>
    </div>
  );
};

export default Home;
