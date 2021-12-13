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
 CloseButton,
 Card,
 CardGroup,
 Carousel
} from "react-bootstrap";

import "../styles/app.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import { faEdit} from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useHistory } from 'react-router'

import {Bar} from 'react-chartjs-2';

import Chart from 'chart.js/auto'






export default class Home extends React.Component {

  constructor(props) {
      super(props)
        this.state = {
          full: [],
          half:[],
          none:[],
        }
  }


  componentDidMount(){
    axios.get("./full.txt")
      .then(res => {
          this.setState({full: res.data});
      })

    axios.get("./half.txt")
      .then(res => {
         this.setState({half: res.data});
      })


    axios.get("./none.txt")
      .then(res => {
        this.setState({none: res.data});
    })
  }




  render() {
    return (

      <Card className="text-center" style={{backgroundColor:"#343a40",color:"white"}}>
        <Card.Header>summary of payements</Card.Header>
        <Card.Body>
          <div>
            <Bar
              data={{
  labels: ['fully paid', 'partially paid', 'not paid'],
  datasets: [
    {
      label: 'number of tenants',
      backgroundColor: '#0b7379',
      borderColor: '#0b7379',
      borderWidth: 2,
      data: [this.state.full,this.state.half,this.state.none]
    }
  ]}}
              options={{
                title:{
                  display:true,
                  text:'payement',
                  fontSize:20,
                  fontColor: "blue"
                },
                legend:{
                  display:true,
                  position:'right',
                  fontColor: 'white'
                }
              }}
            />
          </div>
          
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
      
    );
  }
}


