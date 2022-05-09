import "./components/styles/App.css";
import Register from "./components/authorisation/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePic from "./components/authorisation/ProfilePic";
import Home from "./components/home/Home";
import Login from "./components/authorisation/Login";
function App() {
  const person = JSON.parse(localStorage.getItem("personInStorage"));
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          {person ? (
            <Route exact path="/home" element={<Home />} />
          ) : (
            <Route exact path="/" element={<Login />} />
          )}
          <Route exact path="/" element={<Home />} />  
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/register/create-profile-pic"
            element={<ProfilePic />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
