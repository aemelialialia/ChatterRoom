import React from 'react';
import './App.css';
import logo from './chat_logo.png'
import TextInput from './TextInput'

class App extends React.Component {

  state={
    messages: []
  }

  sendMessage = (m) => {
    var messages = [...this.state.messages, m]
    this.setState({messages})
  }
  render() {
    var {messages} = this.state
    console.log(messages);
    // console.log(this.state.messages)
    return (
     <div className="App">
        <header className="header">
          <img src={logo} className="logo" alt="" />
        Chatter
        </header>
        <TextInput className="text-input" alt=""
          sendMessage={this.sendMessage }/>
        <main className="chat">
            <div className="chat-message them">Are we meeting today?</div>
            <div className="chat-message me">yes, what time suits you?</div>
            <div className="chat-message them">I was thinking after lunch</div>
            <div className="chat-message me">Perfect, see you later!</div>
          {messages.map((m,i) => {
            return <div key={i} className="chat-message me">{m}</div>
          })}
        </main>
      </div>
    )
  }
}

export default App;
