import React from 'react';

import Description from './description/Description';
import Timetable from './timetable/Timetable';
import Contact from './contact/Contact';
import StartPuzzle from './startPuzzle/StartPuzzle';

import './PlaceInfo.css';

let objet;
class PlaceInfo extends React.Component{
    constructor(props){
        super(props);
        objet = this;
    }

    /**
     * Close the popup when clicking on the close button
     */
    handlerCloseInfo(){
        document.getElementById("infoDiv").remove();
    }

    render(){
        let info = this.props.wrapper.getPlaceInfo(this.props.place);
        let name = this.props.wrapper.getPlaceName(this.props.place);
        let description = info["description"];
        let startPuzzle = (this.props.puzzle)? <StartPuzzle wrapper={this.props.wrapper} gamePath={this.props.gamePath} place={this.props.place} callbackFunction={callbackFunction}/> : '';
        
        return(
            <div id='placeInfo'>
                {/* <img src='./img/map/placeInfo/close_button.png' alt='' onClick={this.handlerCloseInfo}/> */}
                <button onClick={this.handlerCloseInfo} id="closeButton">X</button>

                <h2>{name}</h2> 

                <Description infos={description}/>

                {(info["horaires"])? [<p class='sectionTitle'>Horaires</p>, <Timetable hours={info["horaires"]}/>] : ''}

                {(info["contact"])? [<p class='sectionTitle'>Contact</p>, <Contact coordonnees={info["contact"]}/>]: ''}
                
                {startPuzzle}
            </div>
        );
    }
} export default PlaceInfo;

function callbackFunction(childData) {
    console.log(childData);
    objet.props.response(objet.props.place);
}