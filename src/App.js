import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
      currentRoomId: "",
      user: null,
    };
  }

  handleRoomSelect(roomId){
    this.setState({currentRoomId: roomId});
  }
  
  setUser(user){
    if(user) {
      this.setState({ user: user.displayName });
    } else {
      this.setState({ user: "Guest" });
    }
  }

  render() {
    return (
      <div className="App">
       <h1>Bloc Chat</h1>
       <RoomList
       handleRoomSelect={(e) => this.handleRoomSelect(e) }
       firebase={firebase}
       />
       <MessageList
       firebase={firebase}
       currentRoomId = {this.state.currentRoomId}
       currentUsername={this.state.user}
       />
       <User
       firebase={firebase}
       currentUsername={this.state.user}
       setUser={(e) => this.setUser(e)}
       />
      </div>
    );
  }
}


export default App;
