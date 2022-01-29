import React from "react";
import './Puzzle.css';
import AnswerForm from './answerForm/AnswerForm'
import Hint from './hint/Hint'
import File from "./file/File";


class Puzzle extends React.Component{
    constructor(props){
        super(props);
        this.puzzle = this.props.wrapper.getPuzzleForPlace(this.props.place);
        this.handleAnswerSubmission = this.handleAnswerSubmission.bind(this);
        this.showQuestion = this.showQuestion.bind(this);
        this.handlerRetry = this.handlerRetry.bind(this);
        this.state = {hint: <button onClick={this.revealHint} id="hint"></button>, content: this.showQuestion(), attempt: 0};
    }


    handleAnswerSubmission(answer){
        this.setState({attempt: this.state.attempt+1});
        if(answer.trim()===this.puzzle["reponse"].trim()){
            let progression = JSON.parse(localStorage.getItem("progression"));
            if(!progression["puzzleValidated"]){
                progression["puzzleValidated"] = [];
            }
            progression["puzzleValidated"].push({title: this.puzzle["intitule"], attempt: this.state.attempt});
            localStorage.setItem("progression",JSON.stringify(progression));
    

            this.setState({content: <div><h2>C'est la bonne réponse !</h2><button onClick={this.handlerGoodAnswer} id="returnMap">Retourner à la carte</button></div>});
        }
        else{
            this.setState({content: <div><button onClick={this.handlerClosePuzzle} id="closeButton">X</button><h2>Mauvaise réponse !</h2><button onClick={this.handlerRetry}>Nouvelle tentative</button></div>});
        }
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
        const puzzleType = this.puzzle["type"];
        const question = this.puzzle["intitule"];
        const hints = this.puzzle["indices"];
        const file = this.puzzle["file"];
        const fileJsx = file !== undefined ? <File file={file}/> : ""; 

        let choices = puzzleType === "QCM" ? this.puzzle["choix"] : false;

        const progression = JSON.parse(localStorage.getItem("progression"));
        let saved = false;
        
        if(progression["revealedHints"]){
            for(const hintObject of progression["revealedHints"]){
                if(hintObject["puzzleTitle"]===question){
                    saved = true;
                }
            }
        }
    
        return (<div id="puzzle">
            <button onClick={this.handlerClosePuzzle} id="closeButton">X</button>
            <h2 id="question">{question}</h2>
            <Hint revealedHints={saved} title={question} hints={hints}/>
            {fileJsx}
            <AnswerForm type={puzzleType} choices={choices} onAnswerChange={this.handleAnswerSubmission} id={this.props.id}/>
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