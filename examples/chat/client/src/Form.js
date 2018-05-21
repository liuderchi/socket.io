import React, { Component } from 'react';
import openSocket from 'socket.io-client';

const SERVER_API = 'http://localhost:3000';

class Form extends Component {
  state = {
    messages: [],
    socket: openSocket(SERVER_API),
    inputText: '',
    numUsers: 0,
  };
  subscribeChatMessage = () => {
    const { socket } = this.state;
    socket.on('new message', msg => {
      const { messages } = this.state;
      this.setState({
        messages: [...messages, msg],
      });
    });
    socket.on('user count', ({ numUsers }) => {
      console.log('user count');
      this.setState({
        numUsers,
      });
    });
  };
  onChange = e => {
    e.preventDefault();
    this.setState({ inputText: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props;
    const { socket, inputText } = this.state;
    socket.emit('new message', {
      author: user,
      payload: inputText,
    });
    this.setState({ inputText: '' });
  };
  componentDidMount() {
    this.subscribeChatMessage();
  }
  render() {
    const { messages, inputText, numUsers } = this.state;
    const { onSubmit, onChange } = this;
    return (
      <React.Fragment>
        <div>Connected Users: {numUsers}</div>
        <ul>
          {messages.map((message, i) => (
            <li key={i}>
              {message.payload} {message.author} {Date(message.timestamp)}
            </li>
          ))}
        </ul>
        <form action={''} onSubmit={onSubmit}>
          <input autoComplete="off" value={inputText} onChange={onChange} />
          <button>Send</button>
        </form>
      </React.Fragment>
    );
  }
}

Form.defaultProps = {
  user: 'derek@example.com',
};

export default Form;
