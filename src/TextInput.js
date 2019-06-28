import React from 'react';
import send from './send.png';

class TextInput extends React.Component {
    render(){
        return(<div className="text-input" alt="Type Message">
            <input />
            <button>
                <img src={send} className="send" alt=""/>
            </button>
        </div>)
    }
}

export default TextInput;