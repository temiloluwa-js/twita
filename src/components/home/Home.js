import React from 'react'

const Home = () => {
    const person = JSON.parse(localStorage.getItem("personInStorage"))
  return (
    <div>
       {person && <h1>person {person.firstName} {person.lastName}</h1>}
    </div>
  )
}

export default Home