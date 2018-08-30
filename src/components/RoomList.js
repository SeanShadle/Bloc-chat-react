import React, { Component } from 'react';
import * as firebase from 'firebase'

class RoomList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
    this.roomsRef = firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      console.log(room.name, room.key);
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  formatName(str) {
    var len = str.length;
    var root = str.slice(0, len - 1);
    var end = str.slice(-1);
    return root.charAt(0).toUpperCase() + root.slice(1) + " " + end;
  }
  render() {
    return (
      <div>
        {
          this.state.rooms.map((room, key) =>
            <p className="roomNames" key={room.key}>{this.formatName(room.name)}</p>
          )}
      </div>
    );
  }
}
export default RoomList;