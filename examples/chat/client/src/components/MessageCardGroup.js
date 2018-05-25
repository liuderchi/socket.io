import React, { Component } from 'react';
import MessageCard from './MessageCard';

class MessageCardGroup extends Component {
  render() {
    const { messages, user } = this.props;

    return (
      <div className="MessageCardGroup">
      {messages.map((message, i) => (
        <MessageCard
          key={i}
          message={message}
          displayTime={i === messages.length - 1}
          user={user}
        />
      ))}
      </div>
    )
  }
}

export default MessageCardGroup;
