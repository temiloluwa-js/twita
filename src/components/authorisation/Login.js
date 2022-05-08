import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
    const history = useNavigate()
    const [persons, setPersons] = useState([])
    const [person, setPerson] = useState({})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        axios.get('http://localhost:7000/persons')
        .then(response => setPersons(persons => [...persons, response.data]))
        .then(console.log(persons))
        .catch(err => console.log(err))
    }, [])

    const handleSubmit = (i) => {
        i.preventDefault()
        for (i in persons){
            if (i.username == username && i.password == password){
                   setPerson(i)
                   localStorage.setItem("personInStorage", JSON.stringify(person))
            }
        }
        console.log('Person not Found')
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Username</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="">Password</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login