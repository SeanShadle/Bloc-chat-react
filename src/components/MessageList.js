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
    }, () => this.updateMessages(this.props.currentRoomId));
    this.setState({ content: ''});
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

    const message = snapshot.val();
    message.key = snapshot.key;
    
    this.setState({ allMessages: this.state.allMessages.concat( message )})    
    const uniqueArray = this.state.allMessages.filter( (item, index) => {
      return findWithAttr(this.state.allMessages, "key", item.key) === index;
    })

    this.setState({ allMessages: uniqueArray })
  }

 componentWillReceiveProps(nextProps){
  //  console.log("CWRP called. Here's State: ", this.state)
  //  console.log("Next Props: ", nextProps)
  this.messageRef.on('child_added', (snapshot) => this.loadMessageList(snapshot));
  this.updateMessages(nextProps.currentRoomId);
 }

updateMessages(currentRoomId){
  const currentMessages = this.state.allMessages.filter(function(e){
    return e.roomId === currentRoomId;
  });
  console.log(currentMessages, "Also, updateMessages was called.")
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
           { this.state.messages.map((message, index) =>
               <li key={index}>{message.username}: {message.content}</li>
             )}
         </ul>
         <form onSubmit={(e) => this.createNewMessage(e)}>
           <input type="text" value={this.state.content} onChange={(e) => this.handleNewMessage(e)} />
           <button>Send</button>
         </form>
       </div>
     );
  }
}

export default MessageList;