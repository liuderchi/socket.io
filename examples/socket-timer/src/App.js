import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { subscribeToTimer } from './utils/api';

class App extends Component {
  state = {
    timestamp: 'no timestamp yet',
    interval: 1000,
  };
  componentDidMount() {
    subscribeToTimer(this.state.interval, (err, timestamp) =>
      this.setState({
        timestamp,
      }),
    );
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
        </p>
      </div>
    );
  }
}

export default App;
