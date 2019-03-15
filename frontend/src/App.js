import React, { Component } from 'react';
import axios from 'axios';
import './Main.css';

class App extends Component {

  componentDidMount() {
    axios.get('/profile')
    .then(res => {
      debugger
    })
  }
  render() {
    return (
      <div className="App">
        checking if axios call is working
      </div>
    );
  }
}

export default App;
