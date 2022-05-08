import "./components/styles/App.css";
import Register from "./components/authorisation/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePic from "./components/authorisation/ProfilePic";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<ProfilePic/>} />
          {/* <Route exact path='/register/create-profile-pic' element/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
