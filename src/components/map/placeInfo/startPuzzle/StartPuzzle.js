import React from 'react';
import ReactDOM from 'react-dom';

import Puzzle from '../../../puzzle/Puzzle';

import './StartPuzzle.css';

class StartPuzzle extends React.Component{
    constructor(props){
        super(props);
        this.state={touchstartX: 0, touchendX: 0}
    }
 
    /**
     * Start a puzzle when clicking on the button "Aller à l'énigme"
     */
    showPuzzle(){
        const div = document.createElement("div");
        div.setAttribute("id", "puzzleDiv");

        document.getElementById("infoDiv").style.display = "none";
        document.getElementsByClassName("App-header")[0].appendChild(div);

        ReactDOM.render(
            <Puzzle wrapper={this.props.wrapper} place={this.props.place} gameID={this.props.gameID} response={this.props.callbackFunction} />, 
            document.getElementById("puzzleDiv")
        );
    }

    render(){
        return(
            <div id='startPuzzle' 
                onTouchStart={e => {this.touchstartX = e.changedTouches[0].screenX}}
                onTouchEnd={e => {this.touchendX = e.changedTouches[0].screenX; this.showPuzzle()}}>

                <p>Aller à l'énigme</p>
                <img alt='' src='./img/map/placeInfo/startPuzzle/arrow.png'/>
            </div>
        );
    }

} export default StartPuzzle;