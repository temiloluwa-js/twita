import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/ProfilePic.css";
const ProfilePic = () => {
  const personInStorage = localStorage.getItem(JSON.parse("personInStorage"));
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
    console.log(personInStorage.firstName)
    // axios.put(`http://localhost:7000/persons/${personInStorage.id}`, {
    //   profileUrl: `${profilePic}`
    }, [imageType, backgroundColor])
    
  return (
    <div>
      <img src={profilePic} alt="Profile Picture" />
      <select name="imageType" onChange={(e) => setImageType(e.target.value)}>
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
        onChange={(e) => setBackgroundColor(e.target.value.replace("#", ""))}
      />
    </div>
  );
};

export default ProfilePic;
