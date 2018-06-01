import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import Modal from 'react-modal';
import Welcome from './Welcome';
import MessageCardGroup from './MessageCardGroup';
import logo from '../icons/logo.png';
import './App.css';

const WS_API =
  process.env.REACT_APP_ENV === 'DEV' ? 'http://localhost:3000' : null;
const REST_API =
  process.env.REACT_APP_ENV === 'DEV'
    ? 'http://localhost:3000'
    : `${window.location.origin}:443`;

class App extends Component {
  state = {
    user: '',
    messages: [],
    socket: openSocket(WS_API),
    inputText: '',
    numUsers: 0,
    showModal: true,
  };
  closeModal = e => {
    e.preventDefault();
    if (!this.state.user) return;
    this.setState({ showModal: false });
  };
  componentDidMount() {
    this.subscribeChatMessage();
    fetch(`${REST_API}/messages`)
      .then(res => res.json())
      .then(messages => this.setState({ messages }));
  }
  onChange = e => {
    e.preventDefault();
    this.setState({ inputText: e.target.value });
  };
  onUserChange = e => {
    e.preventDefault();
    this.setState({ user: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { user, socket, inputText } = this.state;
    if (!inputText) return;
    socket.emit('new message', {
      author: user,
      payload: inputText,
    });
    this.setState({ inputText: '' });
  };
  setRef = el => (this.msgsDOM = el);
  scrollBottom = () => {
    if (this.msgsDOM && this.msgsDOM.root) {
      this.msgsDOM.root.scrollTop = this.msgsDOM.root.scrollHeight;
    }
  };
  subscribeChatMessage = () => {
    const { socket } = this.state;
    socket.on('new message', msg => {
      const { messages } = this.state;
      this.setState({
        messages: [...messages, msg],
      });
      this.scrollBottom();
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
    const { onSubmit, onChange, onUserChange, closeModal, setRef } = this;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Welcome numUsers={numUsers} />
        <MessageCardGroup ref={setRef} messages={messages} user={user} />
        <form className={'App-form'} onSubmit={onSubmit}>
          <input autoComplete="off" value={inputText} onChange={onChange} />
          <button type="submit">Send</button>
        </form>
        <Modal isOpen={showModal} contentLabel="Enter User Name">
          <div className="App-Modal">
            <h3>{`What's your name?`}</h3>
            <form onSubmit={closeModal}>
              <input
                autoComplete="off"
                value={user}
                onChange={onUserChange}
                placeholder="Tony Stark"
              />
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
