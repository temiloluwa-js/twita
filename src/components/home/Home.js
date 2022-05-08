import React from 'react'

const Home = () => {
    const person = JSON.parse(localStorage.getItem("personInStorage"))
    const profilePicture = localStorage.getItem("dpurl")
  return (
    <div>
      <img src={profilePicture}/>
       {person && <h1>person {person.firstName} {person.lastName}</h1>}
    </div>
  )
}

export default Home