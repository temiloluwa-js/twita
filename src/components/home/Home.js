import React from "react";
import { useNavigate } from "react-router";
import styles from "../styles/Banner.module.css";
import logo from './twita..png'
import search_icon from './search.svg'

const Home = () => {
  const person = JSON.parse(localStorage.getItem("personInStorage"));
  const dpurl = localStorage.getItem("dpurl");
  const history = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("personInStorage");
    history("/login");
  };
  return (
    <header>
      <div className={styles.top_banner}>
        <img src={logo} alt="home" className={styles.logo} />
        <img src={search_icon} alt="search" className={styles.search_icon} />
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
            <h1>
              Hi {person.firstName}!. What's on your mind?
            </h1>
          )}
        </div>
      </div>

      <button onClick={handleClick}>Log Out</button>
      <button>Make A Post</button>
    </header>
  );
};

export default Home;
