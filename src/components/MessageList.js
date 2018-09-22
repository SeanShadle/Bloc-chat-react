import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
       allMessages: [],
       messages: [],
       content: ''
    };
    this.messageRef = this.props.firebase.database().ref('Messages');
  }
  
  createNewMessage(e){
    e.preventDefault();
    const newMessage = this.state.content;
    this.messageRef.push({
      content: newMessage,
      username: this.props.currentUsername,
      roomId: this.props.currentRoomId
    });
    this.setState({ content: ' '});
  }

  handleNewMessage(e) {
    this.setState({ content: e.target.value });
  }

  componentDidMount() {
    // console.log("CDM called. Here's State: ", this.state)
    this.messageRef.on('child_added', (snapshot) => this.loadMessageList(snapshot));
  }

  loadMessageList(snapshot){
    const findWithAttr = (array, attr, value) => {
      for (var i = 0; i < array.length; i++) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    };

    console.log("LoadMessageList called. Here's State: ", this.state)
    // console.log("snapshot:", snapshot.key)
    const message = snapshot.val();
    message.key = snapshot.key;
    findWithAttr(this.state.allMessages, "roomId", message.roomId) < 0
      ? this.setState({ allMessages: this.state.allMessages.concat( message )})
      : null;
  }

 componentWillReceiveProps(nextProps){
  //  console.log("CWRP called. Here's State: ", this.state)
  //  console.log("Next Props: ", nextProps)
  this.messageRef.on('child_added', (snapshot) => this.loadMessageList(snapshot));
  this.updateMessages(nextProps.currentRoomId);
 }

updateMessages(currentRoomId){
  // console.log(currentRoomId)
  const currentMessages = this.state.allMessages.filter(function(e){
    return e.roomId === currentRoomId;
  });
  this.setState({ messages: currentMessages });
}

componentWillUnmount(){
  this.messageRef.off(this.loadMessageList);
}

  render(){
     return(
       <div>
        <ul>
        </ul>
        <ul>
        {
        this.state.messages.map( (message, index) =>
         <li key={index}>{message.content}</li>
        )
        }
        </ul>
        <form onSubmit={(e) => this.createNewMessage(e)}>
          <input type="text" value={this.state.content} onChange={(e) => this.handleNewMessage(e)}/>
          <button>Send</button>
          </form>
          </div>
     );
  }
}

export default MessageList;