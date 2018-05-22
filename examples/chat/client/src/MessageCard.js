import React, { Component } from 'react';
import './MessageCard.css';

class MessageCard extends Component {
  render() {
    const { message, displayTime = false, user } = this.props;
    return (
      <div className={user === message.author ? 'cardRight' : 'cardLeft'}>
        <div className="author">{message.author}</div>
        <div className="payload">{message.payload}</div>
        {displayTime && (
          <div className="time">
            <small>
            {new Date(message.timestamp).toLocaleString()}
            </small>
          </div>
        )}
      </div>
    );
  }
}

export default MessageCard;
