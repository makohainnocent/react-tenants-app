import React from "react";
import {
 Navbar,
 Nav,
 NavDropdown,
 Form,
 FormControl,
 Button,
 Label,
 Table,
 Badge,
 Modal,
 FloatingLabel,
 CloseButton
} from "react-bootstrap";

import "../styles/app.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import { faEdit} from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useHistory } from 'react-router'

export default class NotPaid extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get("http://makoha-001-site1.itempurl.com/api/v1/Payements")
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

 
  render() {
    return (
      <div className='MainContent'>
        <h2><Badge bg="inverse">Members who have not paid</Badge></h2>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Room</th>
              <th>Price</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            
            {
              this.state.persons
                .map(person =>
                  <tr key={person.id}>
                    <td>{person.id}</td>
                    <td>{person.firstName}</td>
                    <td>{person.lastName}</td>
                    <td>{person.room}</td>
                    <td>{person.price}</td>
                    <td>{person.paid}</td>
                    <td>{person.price-person.paid}</td>
                    <td>
                    <div class="btn-group">
                      <EditModalButton id={person.id} paid={person.paid} room={person.roomId}/>
                      <DeleteModalButton id={person.id} paid={person.paid}/>
                    </div>
                    </td>
                  </tr>
                )
            }
          </tbody>
        </Table>
        <div class="btn-group pull-right">
          <button class="btn">1</button>
          <button class="btn">2</button>
          <button class="btn">3</button>
        </div>
        
     </div>
  
    )
  }
}



function EditModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{color: "black"}}>
          <span style={{color: "black"}}>Editing Transaction Id #{props.title}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3 style={{color: "black"}}>Amount Paid</h3>
        <p>
          <EditModalSave paid={props.paid} id={props.title} room={props.room}/>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function DeleteModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{color: "black"}}>
          <span style={{color: "black"}}>Deleting Transaction Id #{props.title}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3 style={{color: "black"}}>Amount Paid</h3>
        <p>
          <DeleteModalSave paid={props.paid} id={props.title}/>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function EditModalButton(props) {
  const [modalShow, setModalShow] = React.useState(false);
  

  return (
    <>
      
        <button class="btn"><FontAwesomeIcon icon={faEdit } onClick={() => setModalShow(true)}/></button>
        
      

      <EditModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title={props.id}
          paid={props.paid}
          room={props.room}
      />
    </>
  );
}

function DeleteModalButton(props) {
  const [modalShow, setModalShow] = React.useState(false);
  

  return (
    <>
      
      <button class="btn"><FontAwesomeIcon icon={faTrash } onClick={() => setModalShow(true)}/></button>
  
      

      <DeleteModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title={props.id}
          paid={props.paid}
      />
    </>
  );
}


function EditModalSave(props) {
  const [Paid, setPaid] = React.useState("4242424");
  const change = useRef(0);

  useEffect(() => {
    change.current = Paid;
  }, [Paid]);


  const handleSave = (event) => {

    event.preventDefault();

      const data = {'payementId':props.id,"Paid":change.current,"roomId":props.room};
          axios.put(`http://makoha-001-site1.itempurl.com/api/v1/Payements/${props.id}`, data)
              .then(response => alert(response.data)).catch(error => {
              alert('There was an error!', error);
          });
    
  }



  return (
    <>
      <form onSubmit={handleSave}>
        <Form.Control type="text" placeholder={props.paid} onChange={(e) => setPaid(e.target.value)}/>
        <br></br>
        <Button type="submit" id="element1" variant="success">Save</Button>
      </form>
    </>
  )
}


function DeleteModalSave(props) {

  const handleSave = (event) => {
    event.preventDefault();

      const data = {};
          axios.delete(`http://makoha-001-site1.itempurl.com/api/v1/Payements/${props.id}`)
              .then(response => alert(response.data)).catch(error => {
              alert('There was an error!', error);
            
          });
    
  }



  return (
    <>
      <form onSubmit={handleSave}>
        <Form.Control type="text" placeholder={props.paid} readOnly/>
        <br></br>
        <Button type="submit" id="element1" variant="warning">Delete</Button>
      </form>
    </>
  )
}



