import React from 'react';
// import send from './send.png';
import { IoIosSend } from "react-icons/io";
import {IoIosCamera} from "react-icons/io";

class TextInput extends React.Component {

    state={
        // text:"Write your message here..."
    }

    send = () => {
        this.props.sendMessage(this.state.text);
        this.setState({text:""})
    }

    keyPress = (e) => {
        if(e.key==='Enter') {
            e.preventDefault()
            this.send()
        }
    }

    render(){
        return(<div className="text-input" alt="Type Message">
            <textarea value={this.state.text}
                placeholder='Write your message here...'
                onChange={e=> this.setState({text: e.target.value})}
                onKeyPress={this.keyPress}
            />
            <button onClick={this.props.showCamera}>
                <IoIosCamera style={{height:30,width:30}} />
            </button>
            <button disabled={!this.state.text}
                onClick={this.send}>
                <IoIosSend style={{height:30,width:30}} />
            </button>
        </div>
        )
    }
}

export default TextInput;