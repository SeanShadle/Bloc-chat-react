import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

  var config = {
    apiKey: "AIzaSyAl73Xk7t6P9NrIsE5kwZBcSJxatPmPQhI",
    authDomain: "bloc-chat-react-498ed.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-498ed.firebaseio.com",
    projectId: "bloc-chat-react-498ed",
    storageBucket: "bloc-chat-react-498ed.appspot.com",
    messagingSenderId: "1078912078343"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentRoomId: ""
    };
  }

  handleRoomSelect(roomId){
    this.setState({currentRoomId: roomId});
  }
  
  
  render() {
    return (
      <div className="App">
       <h1>Bloc Chat</h1>
       <RoomList
       handleRoomSelect={(e) => this.handleRoomSelect(e) }
       firebase = {firebase}
       />
       <MessageList
       firebase = {firebase}
       currentRoomId = {this.state.currentRoomId}
       />
      </div>
    );
  }
}


export default App;
