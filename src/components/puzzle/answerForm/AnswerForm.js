import React from 'react';

import './AnswerForm.css';

class AnswerForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    /**
     * Handler when select a response in a MCQ
     * @param event the click event on the checkbox selected
     */
    handleChange(event){
        if(this.props.type === "QCM"){
            //Unchecked all checkbox excepted the one which is considered
            const form = document.getElementById("answer");
            for(const element of form){ 
                if(element instanceof HTMLInputElement && element.type !== "submit" && element.value !== event.target.value && element.checked){
                    element.checked = false;
                }

                if(event.target.checked){
                    this.setState({value: event.target.value});
                }else{
                    this.setState({value: ""});
                }
            }
        }else{
            this.setState({value: event.target.value});
        }
    }

    /**
     * Display the answer form 
     */
    componentDidMount(){
        switch(this.props.type){
            case "QR":
                this.setState({content: 
                    <form onSubmit={this.handleSubmit} id="answer">
                        <input placeholder='Votre réponse :' type="text" name="answer" onChange={this.handleChange}/>
                        <input type="submit" style={{margin: "5rem"}} value="Soumettre la réponse" />
                    </form>}
                );
                break;
            case "QCM":
                let arrayChoices = [];
                for(const element of this.props.choices){
                    arrayChoices.push(
                        <div>
                            <input type="checkbox" onChange={this.handleChange} key={element} value={element} name={element}/>
                            <label htmlFor={element}>{element}</label>
                        </div>
                    );
                }
                this.setState({content: 
                    <form onSubmit={this.handleSubmit} id="answer"> 
                        <div id='choices'>
                            {arrayChoices}
                        </div>      
                        <input type="submit" style={{margin: "5rem"}} value="Soumettre la réponse"/>
                    </form>}
                ); 
                break;
            default:
                return;
        }
    }
    
    /**
     * Handler when the player click on the button to submit his response
     * @param event the click event on the submit button 
     */
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
} export default AnswerForm;