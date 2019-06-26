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
    </div>
  )
}

export default App;
