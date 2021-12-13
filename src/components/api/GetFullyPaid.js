import React from 'react';
import axios from 'axios';

export default class GetFullyPaid extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get("./paid.json")
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

 
  render() {
    return (
      this.state.persons
    )
  }
}