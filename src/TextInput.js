import React from 'react';
// import send from './send.png';
import { IoIosSend } from "react-icons/io";
import { IoIosCamera } from "react-icons/io";
import { IoIosHappy } from "react-icons/io";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class TextInput extends React.Component {

    state = {
        text: "",
        showPicker: false
    }

    send = () => {
        this.props.sendMessage(this.state.text);
        this.setState({ text: "" })
    }

    keyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            this.send()
        }
    }

    addEmoji = (e) => {
        //console.log(e.native)
        let emoji = e.native;
        this.setState({
            text: this.state.text + emoji
        })
    }

    toggleEmoji = () => {
        this.setState({ showPicker : !this.state.showPicker })
    }

    render() {
        return (<div className="text-input" alt="Type Message">
            <textarea value={this.state.text}
                placeholder='Write your message here...'
                onChange={e => this.setState({ text: e.target.value })}
                onKeyPress={this.keyPress}
            />
               {this.state.showPicker && <Picker
                    set='emojione'
                    onSelect={this.addEmoji}
                    title='Pick your emoji…' emoji='point_up'
                    style={{ position: 'absolute', bottom: '81px', right: '67px' }}
                    i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }} />}
            <button onClick={this.toggleEmoji}>
                <IoIosHappy style={{ height: 30, width: 30 }} />
            </button>
            <button onClick={this.props.showCamera}>
                <IoIosCamera style={{ height: 30, width: 30 }} />
            </button>
            <button disabled={!this.state.text}
                onClick={this.send}>
                <IoIosSend style={{ height: 30, width: 30 }} />
            </button>
        </div>
        )
    }
}

export default TextInput;