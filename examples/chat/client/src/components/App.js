import React, { Component } from 'react';
// import openSocket from 'socket.io-client';
import io from 'socket.io-client'
import Modal from 'react-modal';
import Welcome from './Welcome';
import MessageCardGroup from './MessageCardGroup';
import logo from '../icons/logo.svg';
import './App.css';

// const SERVER_API = 'http://localhost:3000';

class App extends Component {
  state = {
    user: 'Tony Stark',
    messages: [],
    socket: io(),
    inputText: '',
    numUsers: 0,
    showModal: true,
  };
  closeModal = () => this.setState({ showModal: false });
  componentDidMount() {
    this.subscribeChatMessage();
  }
  onChange = e => {
    e.preventDefault();
    this.setState({ inputText: e.target.value });
  };
  onUserChange = e => {
    e.preventDefault();
    this.setState({ user: e.target.value });
  }
  onSubmit = e => {
    e.preventDefault();
    const { user, socket, inputText } = this.state;
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
    const { user, messages, inputText, numUsers, showModal } = this.state;
    const { onSubmit, onChange, onUserChange, closeModal } = this;

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
        <Modal
          isOpen={showModal}
          contentLabel="Enter User Name"
        >
          <div className="App-Modal">
            <h3>{`What's your name?`}</h3>
            <form onSubmit={closeModal}>
              <input autoComplete="off" value={user} onChange={onUserChange} />
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
