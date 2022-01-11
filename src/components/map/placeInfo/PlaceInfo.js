import React from 'react';
import ReactDOM from 'react-dom';

import Puzzle from '../../puzzle/Puzzle';
import Timetable from './timetable/Timetable';
import Contact from './contact/Contact';

import './PlaceInfo.css';

let objet;
class PlaceInfo extends React.Component{
    constructor(props){
        super(props);
        objet = this;
        this.gameW = this.props.wrapper;  
        this.place = this.props.place;
        this.puzzle = this.props.puzzle;
    }

    /**
     * Close the popup when clicking on the close button
     */
    handlerCloseInfo(){
        document.getElementById("infoDiv").remove();
    }

    /**
     * Start a puzzle
     */
     startPuzzle(){
        const puzzleObject = this.gameW.getPuzzleForPlace(this.place);
        const div = document.createElement("div");
        div.setAttribute("id", "puzzleDiv");

        document.getElementById("infoDiv").style.display = "none";
        document.getElementsByClassName("App-header")[0].appendChild(div);

        ReactDOM.render(
            <Puzzle puzzleObject={puzzleObject}  response = {callbackFunction} />,
            document.getElementById("puzzleDiv")
        );
    }

    render(){
        let info = this.gameW.getPlaceInfo(this.place);
        let name = this.gameW.getPlaceName(this.place);
        let description = info["description"];

        let btnPuzzle = (this.puzzle)? <button onClick={() => {this.startPuzzle()}}>Aller à l'énigme</button> : '';

        return(
            <div id='placeInfo'>
                <button type='button' onClick={this.handlerCloseInfo}>X</button>
                <h2>{name}</h2> 
                <p id='description'>
                    {description}
                </p>

                {(info["horaires"])? [<p class='sectionTitle'>Horaires</p>, <Timetable hours={info["horaires"]}/>] : ''}

                {(info["contact"])? [<p class='sectionTitle'>Contact</p>, <Contact coordonnees={info["contact"]}/>]: ''}
                
                {btnPuzzle}
            </div>
        );
    }
} export default PlaceInfo;

function callbackFunction(childData) {
    console.log(childData);
    objet.props.response(objet.place);
}