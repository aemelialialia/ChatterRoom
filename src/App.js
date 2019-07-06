import React from 'react';
import './App.css';
import logo from './chat_logo.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker.js'

class App extends React.Component {

  state={
    messages: [],
    name:"",
    editName: true
  }

  sendMessage = (m) => {
    var messages = [...this.state.messages, m]
    this.setState({messages})
  }

  setEditName = (boolean) => {
    var editName = boolean
    this.setState({editName})
  }

  changeName = (e) => {
    var name = e
    this.setState({name})
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
        <div className="name-input">
        <NamePicker 
          name={this.state.name}
          editName={this.state.editName}
          changeName={this.changeName}
          setEditName={this.setEditName} />
          </div>
        </header>
        <TextInput className="text-input" alt=""
          sendMessage={this.sendMessage}/>
        <main className="chat">
            <div className="chat-message them">Are we meeting today?</div>
            <div className="chat-message me">yes, what time suits you?</div>
            <div className="chat-message them">I was thinking after lunch</div>
            <div className="chat-message me">Perfect, see you later!</div>
          {messages.map((m,i) => {
            return <div key={i} className="chat-message me">
              <span>{m}</span>
            </div>
          })}
        </main>
      </div>
    )
  }
}

export default App;
