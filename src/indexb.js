import React from "react";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contacts";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/blogs">Blog Articles</Link>
      </div>
      <div>
        <Link to="/contact">Contact Me</Link>
      </div>

      <hr />
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
  
      </div>
    </Router>
  );
}

export default App;



ReactDOM.render(<App />, document.getElementById("root"));




