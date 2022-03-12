import React from "react";

import './Intro.css';

class Intro extends React.Component{
    constructor(props){
        super(props);
        this.wrapper = this.props.wrapper;
    }

    /**
     * Close the game introduction page to display the map
     */
    closeIntro(){
        document.getElementById("intro").style.display = "none";
    }

    render(){
        let intro = this.wrapper.getIntro();
        let nbPlaces = (this.wrapper.getNbPlaces() > 1) ? `${this.wrapper.getNbPlaces()} lieux et énigmes composent ce parcours.` : `Ce parcours comporte un unique lieu à visiter.`; 

        return (
            <div id="intro">
                <h2 key="title">{intro["titre"]}</h2>
                <p key="context">{intro["contexte"]}</p>
                <p key="nbPlaces">{nbPlaces}</p>
                <p key="instructions">{intro["consignes"]}</p>
                <button onClick={this.closeIntro} key="play">Jouer</button>
            </div>
        );
    }
    
} export default Intro;