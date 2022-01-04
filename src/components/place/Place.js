import React from "react";
import './Place.css';
import Puzzle from "../puzzle/Puzzle";
import ReactDOM from 'react-dom'

class Place extends React.Component{
    constructor(props){
        super(props);
        this.handlerGoToPuzzle = this.handlerGoToPuzzle.bind(this);
        this.state = {placeName: 'L\'Aqua', informations: 'Lorem Ipsum........'};
    }

    handlerCloseInformationsPlace(){
        document.getElementById("placeInformationsDiv").remove();
    }

    /**
     * Start the puzzle associated to the place
     */
    handlerGoToPuzzle(){
        this.handlerCloseInformationsPlace();

        const div = document.createElement("div");
        div.id = "puzzleDiv";
        document.getElementsByClassName("App-header")[0].appendChild(div);

        ReactDOM.render(
            <Puzzle id="1"/>,
            document.getElementById("puzzleDiv")
        );
    }

    //TO DO
    render(){
        return (<div id="place">
            <button onClick={this.handlerCloseInformationsPlace} id="closeButton">X</button>
            <h2 id="placeName">
                {this.state.placeName}
            </h2>
            <p id="resume">
                {this.state.informations}
            </p>
            <button id="goToPuzzle" onClick={this.handlerGoToPuzzle}>Aller à l'énigme</button>
        </div>);
    }
}

export default Place;