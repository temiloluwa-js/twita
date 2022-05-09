import React from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
    const person = JSON.parse(localStorage.getItem("personInStorage"))
    const history = useNavigate()
    const handleClick = () => {
      localStorage.removeItem("personInStorage")
      history('/login')
    }
  return (
    <div>
      <img src={person.profilePicUrl} width='200px' height='200px'/>
       {person && <h1>person {person.firstName} {person.lastName}</h1>}
       <button onClick={handleClick}>Log Out</button>
       <button>Make  A Post</button>
    </div>
  )
}

export default Home