import axios from "axios";
import React from "react";

const Login = () => {
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
      e.preventDefault()
      localStorage.setItem('person', person)
      axios.post('')
  }

  
  return (
    <div>
      <form className="register" onSubmit={handleSubmit}>
        <div>
          <p>Names</p>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" onChange={(e) => setPerson({...person, firstName: e.target.value})} />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" onChange={(e) => setPerson({...person, lastName: e.target.value})} />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input type="number" onChange={(e) => setPerson({...person, age: e.target.value})} />
            <label htmlFor="gender">Gender</label>
            <select name="gender"  onChange={(e) => setPerson({...person, gender: e.target.value})}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
              <label htmlFor="username">Username</label>
              <input type="text" onChange={(e) => setPerson({...person, username: e.target.value})} />
              <label htmlFor="password">Password</label>
              <input type="password" onChange={(e) => setPerson({...person, password: e.target.value})} />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" onChange={(e) => setPerson({...person, confirmPassword: e.target.value})}/>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
