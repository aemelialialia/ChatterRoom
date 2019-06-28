import React from 'react';
import './App.css';
import logo from './chat_logo.png'
import TextInput from './TextInput'

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={logo} className="logo" alt="" />
       Chatter
      </header>
      <TextInput className="text-input" alt=""/>
        <div class="chat">
        <div class="chat-message them">Are we meeting today?</div>
        <div class="chat-message me">yes, what time suits you?</div>
        <div class="chat-message them">I was thinking after lunch</div>
        <div class="chat-message me">Perfect, see you later!</div>
      </div>
    </div>
  )
}

export default App;
