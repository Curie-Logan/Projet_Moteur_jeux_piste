import React from 'react';
import './Hint.css';


class Hint extends React.Component{
    constructor(props){
        super(props);
        this.handleRevealHint = this.handleRevealHint.bind(this);
        this.state = {content: <button id="hint" onClick={this.handleRevealHint}>Révéler un indice</button>, revealed: false};
    }
    

    handleRevealHint(){
        this.setState({content: <h3>{this.props.hint}</h3>});
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