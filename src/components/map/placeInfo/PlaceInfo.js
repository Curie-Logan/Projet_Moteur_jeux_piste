import React from 'react';
import ReactDOM from 'react-dom'

import Puzzle from '../../puzzle/Puzzle';

import './PlaceInfo.css';

class PlaceInfo extends React.Component{
    constructor(props){
        super(props);
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

        document.getElementById("infoDiv").style.display = "none"; //gérer dans le css plus tard
        document.getElementsByClassName("App-header")[0].appendChild(div);

        ReactDOM.render(
            <Puzzle puzzleObject={puzzleObject}/>,
            document.getElementById("puzzleDiv")
        );
    }

    render(){
        let name = this.gameW.getPlaceName(this.place);
        let info = this.gameW.getPlaceInfo(this.place);
        let description = info["description"];
        
        //Récupérer et afficher les autres infos

        let btnPuzzle = (this.puzzle)? <button onClick={(e) => {this.startPuzzle(e)}}>Aller à l'énigme</button> : '';
        return(
            <div id='placeInfo'>
                <button type='button' onClick={this.handlerCloseInfo}>X</button>
                <h2>{name}</h2> 
                <div id='description'>{description}</div>
                <p>Horaires</p>
                {btnPuzzle}
            </div>
        );
    }
}


export default PlaceInfo;