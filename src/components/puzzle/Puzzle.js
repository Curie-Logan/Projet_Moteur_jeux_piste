import React from "react";

import AnswerForm from './answerForm/AnswerForm'
import Hint from './hint/Hint'
import File from "./file/File";

import './Puzzle.css';

class Puzzle extends React.Component{
    constructor(props){
        super(props);
        this.puzzle = this.props.wrapper.getPuzzleForPlace(this.props.place);
        this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);
        this.handlerGoodAnswer = this.handlerGoodAnswer.bind(this);
        this.handlerRetry = this.handlerRetry.bind(this);
        this.showQuestion = this.showQuestion.bind(this);
        this.state = {  hint: <button onClick={this.revealHint} id="hint"/>, 
                        content: this.showQuestion(), 
                        attempt: 0};
    }

    /**
     * Handler when an answer is submitted 
     * @param answer the answer submitted
     */
    handleAnswerSubmission(answer){
        this.setState({attempt: this.state.attempt+1});
        if(answer.toUpperCase().trim() === this.puzzle["reponse"].toUpperCase().trim()){
            let progression = JSON.parse(localStorage.getItem("progression"));

            if(!progression["puzzleValidated"]){
                progression["puzzleValidated"] = [];
            }

            progression["puzzleValidated"].push({title: this.puzzle["titre"], attempt: this.state.attempt});
            localStorage.setItem("progression",JSON.stringify(progression));
    
            this.setState({content: <div><h2>C'est la bonne réponse !</h2><button onClick={this.handlerGoodAnswer} id="returnMap">Retourner à la carte</button></div>});
        }else{
            this.setState({content: <div><h2>Mauvaise réponse !</h2><button id="retry" onClick={this.handlerRetry}>Nouvelle tentative</button></div>});
        }
    }

    /**
     * Handler when the button to close is pressed
     */
    handlerClosePuzzle(){
        document.getElementById("puzzleDiv").remove();
        document.getElementById("infoDiv").style.display = "block";
    }

    /**
     * Handler when a good answer is entered
     */
    handlerGoodAnswer(){
        this.props.response("Good Response");
        document.getElementById("puzzleDiv").remove();
        document.getElementById("infoDiv").remove();
    }

    /**
     * Handler when the button to retry is pressed
     */
    handlerRetry(){
        this.setState({content: this.showQuestion()});
    }

    /**
     * Constructs the content of the question
     */
    showQuestion(){
        const puzzleType = this.puzzle["type"];
        const title = this.puzzle["titre"];
        const entitled = this.puzzle["intitule"];
        const hints = this.puzzle["indices"];
        const file = this.puzzle["fichier"];

        const fileJsx = (file !== undefined) ? <File gameID={this.props.gameID} file={file}/> : ""; 

        let choices = (puzzleType === "QCM") ? this.puzzle["choix"] : false;

        const progression = JSON.parse(localStorage.getItem("progression"));
        let saved = false;
        
        if(progression && progression["revealedHints"]){
            for(const hintObject of progression["revealedHints"]){
                if(hintObject["puzzleTitle"]===title){
                    saved = true;
                }
            }
        }
    
        let question = [];
        let key = 0;
        for (let paragraph of entitled){
            question.push(<p key={key}>{paragraph}</p>);
            key++;
        }

        return (
            <div>
                <button onClick={this.handlerClosePuzzle} id="closeButton">X</button>
                <h2 id="title">{title}</h2>
                <div id="question">{question}</div>
                {fileJsx}
                <Hint revealedHints={saved} title={title} hints={hints}/>
                <AnswerForm type={puzzleType} choices={choices} onAnswerChange={this.handleAnswerSubmission} id={this.props.id}/>
            </div>
        );
    }
    //puzzleInformations
    render(){
        return (
           <div id="puzzle"> 
               {this.state.content}
           </div>
        );
    }
} export default Puzzle;