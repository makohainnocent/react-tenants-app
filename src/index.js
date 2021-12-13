import React from 'react';

import ReactDOM from "react-dom";

import Navigation from "./components/navigation";
import Guest from "./components/Guest";
import {Container} from "react-bootstrap";

import { BrowserRouter } from 'react-router-dom';

import "./styles/navbar.css";



function App() { 

  return (
      <div className='app'>

       <Navigation />
      </div>
  )
  

  

}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"));
