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

export default class AllRooms extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get("http://makoha-001-site1.itempurl.com/api/v1/Rooms")
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

 
  render() {
    return (
      <div className='MainContent'>
        <h2 style={{float:"left"}}><Badge bg="inverse">Rooms</Badge></h2>
        <CreateModalButton/>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Room</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            
            {
              this.state.persons
                .map(person =>
                  <tr key={person.id}>
                    <td>{person.roomId}</td>
                    <td>{person.room}</td>
                    <td>{person.price}</td>
                    <td>
                    <div class="btn-group">
                      <EditModalButton id={person.roomId} room={person.room} price={person.price}/>
                      <DeleteModalButton id={person.id} room={person.room} price={person.price}/>
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
          <span style={{color: "black"}}>Editing Room Id #{props.id}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 style={{color: "black"}}>{props.room}</h5>

        <p>
          <EditModalSave id={props.id} room={props.room} price={props.price}/>
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
          <span style={{color: "black"}}>Create a new room</span>
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
          <span style={{color: "black"}}>Deleting Room Id #{props.id}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 style={{color: "black"}}>Details</h5>
        <p>
          <DeleteModalSave id={props.id} room={props.room} price={props.price}/>
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
          room={props.room} 
          price={props.price} 
          
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
          room={props.room} 
          price={props.price} 
      />
    </>
  );
}


function EditModalSave(props) {
  const [room, setroom] = useState("");
  const [price, setprice] = useState("");

  const handleSave = (event) => {

    event.preventDefault();

      const data = {'roomId':props.id,'room':room,'price':price};
          axios.put(`http://makoha-001-site1.itempurl.com/api/v1/Rooms/${props.id}`, data)
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

        <Form.Group className="mb-3" controlId="formBasicRoom">
          <Form.Label>Room</Form.Label>
          <Form.Control type="text" placeholder={props.room} onChange={(e) => setroom(e.target.value)}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder={props.price} onChange={(e) => setprice(e.target.value)}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>


        
        <Button type="submit" id="element1" variant="success">Save</Button>
      </Form>
    </>
  )
}


function CreateModalSave(props) {
  const [room, setroom] = useState("");
  const [price, setprice] = useState("");

  const handleSave = (event) => {

    event.preventDefault();

      const data = {'room':room,'price':price};
          axios.post("http://makoha-001-site1.itempurl.com/api/v1/Rooms", data)
              .then(response => alert(response.data)).catch(error => {
              alert('There was an error!', error);
          });
    
  }



  return (
    <>
      <Form onSubmit={handleSave}>

        <Form.Group className="mb-3" controlId="formBasicRoom">
          <Form.Label>Room</Form.Label>
          <Form.Control type="text" placeholder={props.room} onChange={(e) => setroom(e.target.value)}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder={props.price} onChange={(e) => setprice(e.target.value)}/>
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
          axios.delete(`http://makoha-001-site1.itempurl.com/api/v1/Rooms/${props.id}`)
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

        <Form.Group className="mb-3" controlId="formBasicRooom">
          <Form.Label>Room</Form.Label>
          <Form.Control type="text" placeholder={props.room} readOnly/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder={props.price} readOnly/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>


        
        <Button type="submit" id="element1" variant="warning">Delete</Button>
      </Form>
    </>
  )
}



