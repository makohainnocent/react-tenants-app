import React, { useState } from "react";
import {
 Navbar,
 Nav,
 NavDropdown,
 Form,
 FormControl,
 Button
} from "react-bootstrap";
 
import "../styles/navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons'
import { faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { faBars} from '@fortawesome/free-solid-svg-icons'
import { Routes, Route, Link } from "react-router-dom";
import AllTenants from "../pages/AllTenants";
import AllRooms from "../pages/AllRooms";
import FullyPaid from "../pages/FullyPaid";
import Home from "../pages/Home";
import PartiallyPaid from "../pages/PartiallyPaid";
import NotPaid from "../pages/NotPaid";
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons'



 
const guest = () => {
  return(

    <h1 style={{color:"white"}}>you are a guest</h1>

  )
};
export default guest;