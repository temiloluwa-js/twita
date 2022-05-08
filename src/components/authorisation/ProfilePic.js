import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../styles/ProfilePic.css'
const ProfilePic = () => {
    const [imageType, setImageType] = useState('male')
    const [profilePic, setProfilePic] = useState('')
    useEffect(() => {
      setProfilePic(`https://avatars.dicebear.com/api/male/john.svg?background=%230000ff`)
    }, [])
  return (
    <div>
      <img src={profilePic}/>
      <select name="" onChange={() => setImageType()}>
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
    </div>
  )
}

export default ProfilePic