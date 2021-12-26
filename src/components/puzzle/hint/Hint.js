import React from 'react';
import './Hint.css';


class Hint extends React.Component{
    constructor(props){
        super(props);
        this.handleRevealHint = this.handleRevealHint.bind(this);
        this.state = {content: <button id="hint" onClick={this.handleRevealHint}>Révéler un indice</button>, revealed: false};
    }
    
    handleRevealHint(){
        //To DO
        this.setState({content: <h3>48 15 16 23 ..</h3>});
    }

    render(){
        return (
            <div>
                {this.state.content}
            </div>
        );
    }
}

export default Hint;