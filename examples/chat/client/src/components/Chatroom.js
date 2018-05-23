import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import MessageCardGroup from './MessageCardGroup';
import './ChatRoom.css';

const SERVER_API = 'http://localhost:3000';
class ChatRoom extends Component {
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
    if (!inputText) return;
    socket.emit('new message', {
      author: user,
      payload: inputText,
    });
    this.setState({ inputText: '' });
    // TODO scroll bottom
  };
  componentDidMount() {
    this.subscribeChatMessage();
  }
  render() {
    const { user } = this.props;
    const { messages, inputText, numUsers } = this.state;
    const { onSubmit, onChange } = this;
    return (
      <React.Fragment>
        <h3>
          {numUsers > 1
            ? `💬 Let's chat with ${numUsers} friends!`
            : `💬 Let's chat!`}
        </h3>
        <MessageCardGroup messages={messages} user={user} />
        <form className={'ChatRoom-form'} onSubmit={onSubmit}>
          <input autoComplete="off" value={inputText} onChange={onChange} />
          <button type="submit">Send</button>
        </form>
      </React.Fragment>
    );
  }
}

ChatRoom.defaultProps = {
  user: 'derek@example.com',
};

export default ChatRoom;
