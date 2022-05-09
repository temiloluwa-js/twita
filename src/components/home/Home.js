import React from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
    const person = JSON.parse(localStorage.getItem("personInStorage"))
    const dpurl = localStorage.getItem("dpurl")
    const history = useNavigate()
    const handleClick = () => {
      localStorage.removeItem("personInStorage")
      history('/login')
    }
  return (
    <div>
      {person.profilePicUrl ? <img src={person.profilePicUrl} alt='Profile Picture' width='200px' height='200px'/> : <img src={dpurl} alt='Profile Picture' width='200px' height='200px'/>}
       {person && <h1>person {person.firstName} {person.lastName}</h1>}
       <button onClick={handleClick}>Log Out</button>
       <button>Make  A Post</button>
    </div>
  )
}

export default Home