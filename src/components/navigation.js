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



 
const Navigation = () => {
 const [isActive, setActive] = useState("true");

  const ToggleClass = () => {
    setActive(!isActive); 
   };
 
 return (
   <div className="myNav">
   <div className="wrapper">
       <nav id="sidebar" className={isActive ? "active" : "null"}>
           <div className="sidebar-header">
               <FontAwesomeIcon icon={faChalkboardTeacher } size="9x" /> 
           </div>

           <ul className="list-unstyled components">
               <p>View Records</p>
               <li className="">
              
                     <Link to="/"><FontAwesomeIcon icon={faAngleRight }/> Home</Link>
            
               </li>
               <li>
                   <Link to="/AllTenants"><FontAwesomeIcon icon={faAngleRight }/> All Tenants</Link>
               </li>

               <li>
                   <Link to="/AllRooms"><FontAwesomeIcon icon={faAngleRight }/> All Rooms</Link>
               </li>

               <li>
                   <Link to="/FullyPaid"><FontAwesomeIcon icon={faAngleRight }/> Fully Paid</Link>
               </li>

               <li>
                   <Link to="/PartiallyPaid"><FontAwesomeIcon icon={faAngleRight }/> Partially Paid</Link>
               </li>

               <li>
                   <Link to="/NotPaid"><FontAwesomeIcon icon={faAngleRight }/> Not Paid</Link>
               </li>
           </ul>
       </nav>

       <div id="content">

                  
                   <nav className="navbar navbar-expand-md navbar-light">
                     <a className="navbar-brand" href="#!">
                       <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={ToggleClass}>
                             <i className="fas fa-align-left"><FontAwesomeIcon icon={faBars }/> </i>
                         </button>
                     </a>
                     <a className="navbar-brand" href="#!">
                       <h4>Freedom Hostel</h4>
                     </a>

                     
                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav1"
                       aria-controls="basicExampleNav1" aria-expanded="false" aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"></span>
                     </button>

                    
                    
                    

                    
                     <div className="collapse navbar-collapse" id="basicExampleNav1">

                   
                       <ul className="navbar-nav ml-auto">
                        
                         <li className="nav-item pl-2 mb-2 mb-md-0">
                           <a href="#!" type="button"
                             className="btn btn-outline-info btn-md btn-rounded btn-navbar waves-effect waves-light"><FontAwesomeIcon icon={faSignOutAlt}/>Logout</a>
                         </li>
                       </ul>

                     </div>
                     

                   </nav>

                   
                
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<Home/>} />=
          <Route path="/FullyPaid" element={<FullyPaid/>} />
          <Route path="/AllTenants" element={<AllTenants/>} />
          <Route path="/AllRooms" element={<AllRooms/>} />
          <Route path="/NotPaid" element={<NotPaid/>} />
          <Route path="/PartiallyPaid" element={<PartiallyPaid/>} />
        </Routes>
                
        </div>
   </div>
   </div>
   
 );
};
export default Navigation;