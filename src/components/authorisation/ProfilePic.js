import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "../styles/ProfilePic.module.css";
import image from "./2549395.jpg";
const ProfilePic = () => {
  const history = useNavigate();
  const personInStorage = JSON.parse(localStorage.getItem("personInStorage"));
  const [finalPerson, setFinalPerson] = useState({});
  const [imageType, setImageType] = useState("male");
  const [backgroundColor, setBackgroundColor] = useState("000000");

  const [profilePic, setProfilePic] = useState(
    "https://avatars.dicebear.com/api/male/john.svg?background=%23000000"
  );

  useEffect(() => {
    setProfilePic(
      `https://avatars.dicebear.com/api/${imageType}/${personInStorage.firstName}.svg?background=%23${backgroundColor}`
    );
  }, [imageType, backgroundColor]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:7000/persons?username=${personInStorage.username}`
      )
      .then((response) => setFinalPerson(response.data[0]))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = finalPerson;
    axios
      .put(`http://localhost:7000/persons/${finalPerson.id}`, {
        ...data,
        profilePicUrl: profilePic,
      })
      .then(localStorage.setItem("personInStorage", JSON.stringify({...personInStorage, profilePicUrl: profilePic})))
      .then(console.log(localStorage.getItem("personInStorage")))
      .then(history("/home"));
  };
  return (
    <div className={styles.register_page}>
      <div className={styles.form_div}>
        <img src={image} alt="Wallpaper Doodle" className={styles.img} />

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form_header}>
            <h1>Choose a profile picture</h1>
          </div>
          <div className={styles.form_details}>
            <img src={profilePic} alt="Profile Picture" className={styles.dp} />

            <label className={styles.label}>Profile Picture Style</label>
            <select
              name="imageType"
              onChange={(e) => setImageType(e.target.value)}
              className={styles.select}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="adventurer">Adventurer</option>
              <option value="adventurer-neutral">Adventurer Neutral</option>
              <option value="miniavs">Miniavs</option>
              <option value="pixel-art">Pixel Art</option>
              <option value="identicon">Identicon</option>
              <option value="micah">Micah</option>
              <option value="personas">Personas</option>
              <option value="croodles">Croodles</option>
              <option value="croodles-neutral">Croodles Neutral</option>
              <option value="big-smile">Big Smile</option>
              <option value="bottts">Bottts</option>
            </select>

            <label className={styles.label}>Background Color</label>
            <input
              type="color"
              className={styles.input}
              onChange={(e) =>
                setBackgroundColor(e.target.value.replace("#", ""))
              }
            />
            <div className={styles.submission}>
              <button type="submit" className={styles.button}>
                Choose Profile Picture
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePic;
