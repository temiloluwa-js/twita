import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../styles/ProfilePic.css";
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
      `https://avatars.dicebear.com/api/${imageType}/john.svg?background=%23${backgroundColor}`
    );
  }, [imageType, backgroundColor]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:7000/persons?username=${personInStorage.username}&firstName=${personInStorage.firstName}`
      )
      .then((response) => setFinalPerson(response.data))
      .catch((err) => console.log(err));
  }, [finalPerson]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = finalPerson[0];
    console.log(profilePic);
    axios
      .put(`http://localhost:7000/persons/${finalPerson[0].id}`, {
        ...data,
        profilePicUrl: profilePic,
      })
      .then(history("/"))
      .then(localStorage.setItem("dpurl", profilePic));
  };
  return (
    <div className="loginpage">
      <img src={image} alt="Wallpaper Doodle" />
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <div>
            <img src={profilePic} alt="Profile Picture" className="dp"/>
            <select
              name="imageType"
              onChange={(e) => setImageType(e.target.value)}
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

            <input
              type="color"
              onChange={(e) =>
                setBackgroundColor(e.target.value.replace("#", ""))
              }
            />

            <button type="submit">Choose Profile Picture</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePic;
