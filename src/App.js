import React from 'react';
import './App.css';
import logo from './chat_logo.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker.js'

class App extends React.Component {

  state={
    messages: [],
    name: "",
    editName: true
  }

  render() {
    var {messages} = this.state
    console.log(messages);
    // console.log(this.state.messages)
    return (
     <div className="App">
        <header className="header">
        <div className="title">
          <img src={logo} className="logo" alt="" />
        Chatter
        </div>
        <div className="namepicker">
        <NamePicker
          name={this.state.name}
          editName={this.state.editName}
          changeName={name=>this.setState({name})}
          setEditName={editName=>this.setState({editName})} />
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
