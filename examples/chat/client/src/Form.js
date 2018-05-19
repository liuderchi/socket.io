import React, { Component } from 'react';
import openSocket from 'socket.io-client';

const SERVER_API = 'http://localhost:3000';

class Form extends Component {
  state = {
    messages: [],
    socket: openSocket(SERVER_API),
    inputText: '',
  };
  subscribeChatMessage = () => {
    const { socket } = this.state;
    socket.on('chat message', msg => {
      const { messages } = this.state;
      this.setState({
        messages: [...messages, { id: 20, payload: msg }],
      });
    });
    // TODO set valid id
  };
  onChange = e => {
    e.preventDefault();
    this.setState({ inputText: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const { socket, inputText } = this.state;
    socket.emit('chat message', inputText);
    this.setState({ inputText: '' });
  };
  componentDidMount() {
    this.subscribeChatMessage();
  }
  render() {
    const { messages, inputText } = this.state;
    const { onSubmit, onChange } = this;
    return (
      <React.Fragment>
        <ul>
          {messages.map((message, i) => <li key={i}>{message.payload}</li>)}
        </ul>
        <form action={''} onSubmit={onSubmit}>
          <input autoComplete="off" value={inputText} onChange={onChange} />
          <button>Send</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Form;
