import React, { Component } from 'react';
import ChatRoom from './ChatRoom';
import logo from '../icons/logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <ChatRoom />
      </div>
    );
  }
}

export default App;
