import React from 'react';
import './App.css';
import logo from './chat_logo.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker.js'
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"

class App extends React.Component {

  state={
    messages: [],
    name: "",
    editName: false
  }

  // sendMessage = (text) => {
  //   var message = {
  //     text,
  //     from: this.state.name
  //   }
  //   var newMessagesArray = [message, ...this.state.messages]
  //   this.setState({messages: newMessagesArray})
  // }

  componentWillMount() {
    var name = localStorage.getItem('name')
    if(name) {
      this.setState({name})
    }

    //FIREBASE

      firebase.initializeApp({
      apiKey: "AIzaSyDi6qTqPC9QchL3jDgVzmVlOr7YwWXSi70",
      authDomain: "chatterroom438.firebaseapp.com",
      projectId: "chatterroom438",
      storageBucket: "chatterroom438.appspot.com",
    });
    
    this.db = firebase.firestore();

    this.db.collection("messages").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //console.log(change.doc.data())
          this.receive(change.doc.data())
        }
      })
    })
  }
  
  //MORE FIREBASE: SEND AND RECEIVE

    receive = (m) => {
    const messages = [...this.state.messages, m]
    messages.sort((a,b)=>b.ts-a.ts)
    this.setState({messages})
  }

  send = (m) => {
    this.db.collection("messages").add({
      ...m,
      from: this.state.name || 'No name',
      ts: Date.now()
    })
  }

  setEditName = (editName) => {
    if (!editName) {
      localStorage.setItem('name', this.state.name)
    }
    this.setState({editName})
  }

  render() {
    var {editName, name} = this.state
    var {messages} = this.state
    console.log(messages);
    return (
     <div className="App">
        <header className="header">
        <div className="title">
          <img src={logo} className="logo" alt="" />
        Chatter
        </div>
        <div className="namepicker">
        <NamePicker
            name={name}
            editName={editName}
            changeName={name=> this.setState({name})}
            setEditName={this.setEditName} />
        </div>
        </header>
        <TextInput className="text-input" alt=""
          sendMessage={text=> this.send({text})}/>
        <main className="chat">
          {messages.map((m,i) => {
            return <div key={i} className={`chat-message ${m.from===name?"me":"them"}`}>
             {m.from!==name && <div className="chat-name">{m.from}</div>}
              <span>{m.text}</span>
            </div>
          })}
        </main>
      </div>
    )
  }
}

export default App;
