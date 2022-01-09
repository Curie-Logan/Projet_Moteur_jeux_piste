import React from "react";
import './Puzzle.css';
import AnswerForm from './answerForm/AnswerForm'
import Hint from './hint/Hint'


class Puzzle extends React.Component{
    constructor(props){
        super(props);
        this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);
        this.showQuestion = this.showQuestion.bind(this);
        this.handlerRetry = this.handlerRetry.bind(this);
        this.state = {hint: <button onClick={this.revealHint} id="hint"></button>, content: this.showQuestion(), attempt: 0};
    }


    handleAnswerSubmission(answer){
        if(answer===this.getAnswer()){
            this.setState({content: <div><button onClick={this.handlerGoodAnswer} id="closeButton">X</button><h2>C'est la bonne réponse !</h2></div>});
        }
        else{
            this.setState({content: <div><button onClick={this.handlerClosePuzzle} id="closeButton">X</button><h2>Mauvaise réponse !</h2><button onClick={this.handlerRetry}>Nouvelle tentative</button></div>});
        }
        this.setState({attempt: this.state.attempt+1});
    }

    handlerClosePuzzle(){
        //Solution temporaire ptêtre gérer autrement
        document.getElementById("puzzleDiv").remove();
        document.getElementById("infoDiv").style.display = "block";
    }

    handlerGoodAnswer = () => {
        this.props.response("Good Response");
        document.getElementById("puzzleDiv").remove();
        document.getElementById("infoDiv").remove();
   }


    handlerRetry(){
        this.setState({content: this.showQuestion()});
    }

    /**
     * @returns la question de l'énigme
     */
    getQuestion(){
        return this.props.puzzleObject["intitule"];
    }

    /**
     * @returns la réponse de l'énigme
     */
    getAnswer(){
        return this.props.puzzleObject["reponse"];
    }

    /**
     * @returns l'ensemble des indices de l'énigme
     */
    getHints(){
        return this.props.puzzleObject["indices"];
    }

    showQuestion(){
        const question = this.getQuestion();
        const hints = this.getHints();
        return (<div id="puzzle">
            <button onClick={this.handlerClosePuzzle} id="closeButton">X</button>
            <h2 id="question">{question}</h2>
            <Hint hints={hints}/>
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