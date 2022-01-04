import React from 'react';
import './AnswerForm.css';


class AnswerForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        this.setState({value: event.target.value});
    }

    componentDidMount(){
        this.setState({content: <form onSubmit={this.handleSubmit} id="answer">
                        <input placeholder='Votre réponse :' type="text" name="answer" onChange={this.handleChange}/>
                        <input type="submit" value="Soumettre la réponse" />
                    </form>});
    }
   
    handleSubmit(event){
        this.props.onAnswerChange(this.state.value);
        event.preventDefault();
    }

    render(){
        return (
            <div>
                {this.state.content}
            </div>
        );
    }
}

export default AnswerForm;