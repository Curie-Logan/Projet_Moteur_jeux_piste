import React from "react";
import './Puzzle.css';
import AnswerForm from './answerForm/AnswerForm'
import Hint from './hint/Hint'

//Logos importation

class Puzzle extends React.Component{
    constructor(props){
        super(props);
        this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);
        this.showQuestion = this.showQuestion.bind(this);
        this.handlerRetry = this.handlerRetry.bind(this);
        this.state = {hint: <button onClick={this.revealHint} id="hint"></button>, content: this.showQuestion(), attempt: 0};
    }


    //TO DO
    handleAnswerSubmission(answer){
        if(answer==42){
            this.setState({content: <h2>C'est la bonne réponse !</h2>});
        }
        else{
            this.setState({content: <div><h2>Mauvaise réponse !</h2><button onClick={this.handlerRetry}>Nouvelle tentative</button></div>});
        }
        this.setState({attempt: this.state.attempt+1});
    }

    handlerClosePuzzle(){
        //Solution temporaire ptêtre gérer autrement
        document.getElementById("puzzleDiv").remove();
        document.getElementById("infoDiv").style.display = "block";
    }

    handlerRetry(){
        this.setState({content: this.showQuestion()});
    }


    /* TO DO en fonction du format du parsing
        Affiche la question de l'énigme
    */
    getQuestion(id){
        return "Combien il y a-t-il de toilettes à l'Aqua ?";
    }

    //TO DO
    showQuestion(){
        const question = this.getQuestion(this.props.id);
        return (<div id="puzzle">
            <button onClick={this.handlerClosePuzzle} id="closeButton">X</button>
            <h2 id="question">{question}</h2>
            <Hint/>
            <AnswerForm onAnswerChange={this.handleAnswerSubmission} id={this.props.id}/>
        </div>);
    }


    render(){
        return (
           <div id="puzzleInformations">
               {this.state.content}
           </div>
        );
    }
}



export default Puzzle;