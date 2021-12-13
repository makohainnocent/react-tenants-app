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

export default class AllTenants extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get("http://makoha-001-site1.itempurl.com/api/v1/Tenants",{ crossDomain: true })
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
        //alert(persons)
      })
  }

 
  render() {
    return (
      <div className='MainContent'>
        <h2 style={{float:"left"}}><Badge bg="inverse">Tenants</Badge></h2>
        <CreateModalButton/>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Room</th>
              <th>Phone</th>
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
                    <td>{person.phone}</td>
                    <td>
                    <div class="btn-group">
                      <EditModalButton id={person.id} firstName={person.firstName} lastName={person.lastName} room={person.room} phone={person.phone}/>
                      <DeleteModalButton id={person.id} firstName={person.firstName} lastName={person.lastName} room={person.room} phone={person.phone}/>
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
          <span style={{color: "black"}}>Editing Tenant Id #{props.id}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 style={{color: "black"}}>{props.firstName} {props.lastName}</h5>

        <p>
          <EditModalSave id={props.id} firstName={props.firstName} lastName={props.lastName} room={props.room} phone={props.phone}/>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function CreateModal(props) {
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
          <span style={{color: "black"}}>Create a new tenant</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 style={{color: "black"}}>Details</h5>

        <p>
          <CreateModalSave/>
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
          <span style={{color: "black"}}>Deleting Tenant Id #{props.id}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 style={{color: "black"}}>Details</h5>
        <p>
          <DeleteModalSave id={props.id} firstName={props.firstName} lastName={props.lastName} room={props.room} phone={props.phone}/>
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
          id={props.id}
          firstName={props.firstName} 
          lastName={props.lastName} 
          room={props.room} 
          phone={props.phone}
      />
    </>
  );
}

function CreateModalButton(props) {
  const [modalShow, setModalShow] = React.useState(false);
  

  return (
    <>
      
        
        <h2 style={{float:"right"}} onClick={() => setModalShow(true)}><Badge bg="primary">New</Badge></h2>
        
      

      <CreateModal
          show={modalShow}
          onHide={() => setModalShow(false)}
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
          id={props.id}
          firstName={props.firstName} 
          lastName={props.lastName} 
          room={props.room} 
          phone={props.phone}
      />
    </>
  );
}


function EditModalSave(props) {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [room, setroom] = useState("");
  const [phone, setphone] = useState("");

  const handleSave = (event) => {

    event.preventDefault();

      var data = {'tenantsId':props.id,'firstName':firstName,'lastName':lastName,'roomId':room,'phone':phone};
      console.log(data)
          axios.put(`http://makoha-001-site1.itempurl.com/api/v1/Tenants/${props.id}`, data)
              .then(response => alert(response.data)).catch(error => {
              alert('There was an error!', error);
          });
    
  }



  return (
    <>
      <Form onSubmit={handleSave}>
        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" value={props.id} readOnly/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder={props.firstName} onChange={(e) => setfirstName(e.target.value)}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder={props.lastName} onChange={(e) => setlastName(e.target.value)}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicLastRoom">
          <Form.Label>Room</Form.Label>
          <Form.Control type="text" placeholder={props.room} onChange={(e) => setroom(e.target.value)}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicLastPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" placeholder={props.phone} onChange={(e) => setphone(e.target.value)}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        
        <Button type="submit" id="element1" variant="success">Save</Button>
      </Form>
    </>
  )
}


function CreateModalSave(props) {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [room, setroom] = useState("");
  const [phone, setphone] = useState("");

  const handleSave = (event) => {

    event.preventDefault();

      const data = {'firstName':firstName,'lastName':lastName,'roomId':room,'phone':phone};
          axios.post('http://makoha-001-site1.itempurl.com/api/v1/Tenants', data)
              .then(response => alert(response.data)).catch(error => {
              alert('There was an error!', error);
          });
    
  }



  return (
    <>
      <Form onSubmit={handleSave}>

        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder={props.firstName} onChange={(e) => setfirstName(e.target.value)}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder={props.lastName} onChange={(e) => setlastName(e.target.value)}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicLastRoom">
          <Form.Label>Room</Form.Label>
          <Form.Control type="text" placeholder={props.room} onChange={(e) => setroom(e.target.value)}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicLastPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" placeholder={props.phone} onChange={(e) => setphone(e.target.value)}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        
        <Button type="submit" id="element1" variant="success">Save</Button>
      </Form>
    </>
  )
}


function DeleteModalSave(props) {

  const handleSave = (event) => {
    event.preventDefault();

      const data = {};
          axios.post(`http://makoha-001-site1.itempurl.com/api/v1/Tenants/${props.id}`)
              .then(response => alert(response.data)).catch(error => {
              alert('There was an error!', error);
            
          });
    
  }



  return (
    <>
      <Form onSubmit={handleSave}>
        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" value={props.id} readOnly/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder={props.firstName} readOnly/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder={props.lastName} readOnly/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicLastRoom">
          <Form.Label>Room</Form.Label>
          <Form.Control type="text" placeholder={props.room} readOnly/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicLastPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" placeholder={props.phone} readOnly/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        
        <Button type="submit" id="element1" variant="warning">Delete</Button>
      </Form>
    </>
  )
}



