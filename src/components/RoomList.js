import React, { Component } from 'react';
import './roomlist.css';

class RoomList extends Component {
    constructor(props){
      super(props);
      this.state = {
        rooms: [],
        name: ''
      };
      this.roomsRef = this.props.firebase.database().ref('rooms');
    }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
     const room = snapshot.val();
     room.key = snapshot.key;
     this.setState({ rooms: this.state.rooms.concat( room ) });
   });
  }
  
  loadRoomList(snapshot){
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) });
  }
 
  handleChange(e) {
  this.setState({ name: e.target.value });
 }

 createRoom(e){
   e.preventDefault();
   const newRoom = this.state.name;
   this.roomsRef.push({
     name: newRoom
   });
   this.setState({ name: ' '});
 }

 componentWillUnmount(){
   this.roomsRef.off();
 }

 render(){
  return(
    <div>
    <ul>
      {
       this.state.rooms.map ( ( room, index ) =>
       <li key={room.key} onClick={()=>{
         this.props.handleRoomSelect(room.key);
        //  console.log("Room: ", room);
         }}>
         {room.name}
        </li>
      )}
     </ul>
     <form onSubmit={(e) => this.createRoom(e)}>
       <input type="text" value={this.state.name} onChange={(e) => this.handleChange(e)}/>
       <input type="submit"/>
     </form>
     </div>
  );
 }
}

export default RoomList; 