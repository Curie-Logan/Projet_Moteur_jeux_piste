import React from 'react';
import './Hint.css';


class Hint extends React.Component{
    constructor(props){
        super(props);
        this.handleRevealHint = this.handleRevealHint.bind(this);
        this.state = {content: <button id="hints" onClick={this.handleRevealHint}>Révéler un indice</button>, revealed: 0};
    }
    

    handleRevealHint(){
        if(this.state.revealed<this.props.hints.length){
            let currentContent = [this.state.content];
            this.setState({revealed: this.state.revealed+1});
            currentContent.push(<h3 key={this.state.revealed}>{this.props.hints[this.state.revealed]}</h3>);
            this.setState({content: currentContent});
        }
        else{
            document.getElementById("hints").remove();
            alert("Tous les indices ont été révélés");
        }
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