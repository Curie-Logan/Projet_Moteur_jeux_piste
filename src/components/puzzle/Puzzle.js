import React from "react";
import './Puzzle.css';
import AnswerForm from './answerForm/AnswerForm'
import Hint from './hint/Hint'
import File from "./file/File";


class Puzzle extends React.Component{
    constructor(props){
        super(props);
        this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);
        this.showQuestion = this.showQuestion.bind(this);
        this.handlerRetry = this.handlerRetry.bind(this);
        this.state = {hint: <button onClick={this.revealHint} id="hint"></button>, content: this.showQuestion(), attempt: 0};
    }


    handleAnswerSubmission(answer){
        if(answer===this.props.puzzleObject["reponse"]){
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


    showQuestion(){
        const question = this.props.puzzleObject["intitule"];
        const hints = this.props.puzzleObject["indices"];
        const file = this.props.puzzleObject["file"];
        const fileJsx = file !== undefined ? <File file={file}/> : ""; 
        return (<div id="puzzle">
            <button onClick={this.handlerClosePuzzle} id="closeButton">X</button>
            <h2 id="question">{question}</h2>
            <Hint hints={hints}/>
            {fileJsx}
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