import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCl7xXUrx7Wyq4QLjVzwXBpk120hp-tIbo",
  authDomain: "preserve-e1ae4.firebaseapp.com",
  databaseURL: "https://preserve-e1ae4.firebaseio.com",
  projectId: "preserve-e1ae4",
  storageBucket: "preserve-e1ae4.appspot.com",
  messagingSenderId: "753277195543",
});

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true })

class App extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      car: {}
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleClick() {

    db.collection("cars").doc('ife4muX7vT4fK5j0VFfx').get().then((doc) => {
      this.setState({ name: this.state.value, car: doc.data() })


    });
  }
  handleChange(event) {
    this.setState({ value: event.target.value })
  }
  handleRemove() {
    this.setState({ name: '', value: '' })
  }

  render() {
    let list;
    if (this.state.name) {
      list = <div><MaintenanceList items={this.state.car.maintenanceItems}></MaintenanceList><button onClick={this.handleRemove}>Remove</button></div>
    }
    return (
      <div className="App">
        <label>Lookup</label>
        <input value={this.state.value} onChange={this.handleChange} />
        <button onClick={this.handleClick}>Search</button>
        <br />
        {this.state.name}
        {list}

      </div>
    );
  }
}

class MaintenanceList extends Component {
  render() {
    let x = this.props.items.map((item) => (<li>Maintenance Item: {item.name} Miles {item.mileage}</li>))
    return (
      <div className="MaintenanceList">
        <ul>
          {x}
        </ul>


      </div>
    )
  }
}

export default App;
