import React from 'react';
import './App.css';
import logo from './chat_logo.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker.js'
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"
import Camera from "react-snap-pic";
import Div100vh from 'react-div-100vh'

class App extends React.Component {

  state = {
    messages: [],
    name: "",
    editName: false,
    showCamera: false,
  }

  componentWillMount() {
    var name = localStorage.getItem('name')
    if (name) {
      this.setState({ name })
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
          this.receive({ ...change.doc.data(), id: change.doc.id })
        }

        if (change.type === "removed") {
          this.remove(change.doc.id)
        }
      })
    })
  }

  remove = (id) => {
    var msg = [...this.state.messages]
    var messages = msg.filter(m => m.id !== id)
    this.setState({ messages })
  }

  //MORE FIREBASE: SEND AND RECEIVE

  receive = (m) => {
    const messages = [...this.state.messages, m]
    messages.sort((a, b) => b.ts - a.ts)
    this.setState({ messages })
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
    this.setState({ editName })
  }


  takePicture = async (img) => {
    // console.log(img);
    this.setState({ showCamera: false });
    const imgID = Math.random().toString(36).substring(7);
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child(imgID + '.jpg');
    await ref.putString(img, 'data_url')
    this.send({ img: imgID })
  }

  deleteMessage = (m) => {
    var { name } = this.state.name
    if (name === m.from || name === "Emily") {
      this.db.collection("messages").doc(m.id).delete()
    }
  }


render() {
  var { editName, name, showPicker } = this.state
  var { messages } = this.state
  console.log(messages);
  return (
    <Div100vh className="App">
      <header className="header">
        <div className="title">
          <img src={logo} className="logo" alt="" />
          {editName ? '' : 'Chatter'}
        </div>
        <div className="namepicker">
          <NamePicker
            name={name}
            editName={editName}
            changeName={name => this.setState({ name })}
            setEditName={this.setEditName} />
        </div>
      </header>
      <TextInput className="text-input" alt=""
        sendMessage={text => this.send({ text })}
        showCamera={() => this.setState({ showCamera: true })}
        showPicker={() => this.setState({ showPicker: !showPicker })} />
      {this.state.showCamera && <Camera
        takePicture={this.takePicture} />}
      <main className="chat">
        {messages.map((m, i) => {
          return <Message key={i} m={m} name={name}
            onClick={() => this.deleteMessage(m)} />
        })}
      </main>
    </Div100vh>
  )
}
}

export default App;

const bucket = 'https://firebasestorage.googleapis.com/v0/b/chatterroom438.appspot.com/o/'
const suffix = '.jpg?alt=media'
function Message(props) {
  var { m, name, onClick } = props
  return (<div className={`chat-message ${m.from === name ? "me" : "them"}`}
    onClick={onClick}>
    {m.from !== name && <div className="chat-name">{m.from}</div>}
    <span>{m.text}</span>
    {m.img && <img alt="pic" src={bucket + m.img + suffix} />}
  </div>
  )
}