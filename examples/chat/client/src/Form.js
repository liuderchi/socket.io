import React, { Component } from 'react';
import openSocket from 'socket.io-client';

const SERVER_API = 'http://localhost:3000';

class Form extends Component {
  state = {
    messages: [],
    socket: openSocket(SERVER_API),
  };
  subscribeChatMessage = () => {
    const { socket } = this.state;
    socket.on('chat message', msg => {
      console.warn(`msg: ${msg}`);
      const { messages } = this.state;
      this.setState({
        messages: [...messages, { id: 20, payload: msg }],
      });
    });
    // TODO set valid id
  };
  onSubmit = e => {
    e.preventDefault();
    console.warn('ON SUBMIT');

    const { socket } = this.state;
    socket.emit('chat message', 'MOCK MESSAGE');
    // TODO get input value (jq?)
  };
  componentDidMount() {
    console.warn('IN componentDidMount');
    this.subscribeChatMessage();
  }
  render() {
    const { messages } = this.state;
    const { onSubmit } = this;
    return (
      <React.Fragment>
        <ul>
          {messages.map((message, i) => <li key={i}>{message.payload}</li>)}
        </ul>
        <form action={''} onSubmit={onSubmit}>
          <input autoComplete="off" />
          <button>Send</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Form;
