import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import Welcome from './Welcome';
import MessageCardGroup from './MessageCardGroup';
import logo from '../icons/logo.svg';
import './App.css';

const SERVER_API = 'http://localhost:3000';

class App extends Component {
  state = {
    messages: [],
    socket: openSocket(SERVER_API),
    inputText: '',
    numUsers: 0,
  };
  componentDidMount() {
    this.subscribeChatMessage();
  }
  onChange = e => {
    e.preventDefault();
    this.setState({ inputText: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props;
    const { socket, inputText } = this.state;
    if (!inputText) return;
    socket.emit('new message', {
      author: user,
      payload: inputText,
    });
    this.setState({ inputText: '' });
    // TODO scroll bottom
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
  render() {
    const { user } = this.props;
    const { messages, inputText, numUsers } = this.state;
    const { onSubmit, onChange } = this;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Welcome numUsers={numUsers} />
        <MessageCardGroup messages={messages} user={user} />
        <form className={'App-form'} onSubmit={onSubmit}>
          <input autoComplete="off" value={inputText} onChange={onChange} />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

App.defaultProps = {
  user: 'derek@example.com',
};

export default App;
