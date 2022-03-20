import React from "react";
import ReactDOM from "react-dom";

import Menu from '../menu/Menu';
import Map from "../map/Map";
import Wrapper from "../../wrapper";

import './Ending.css';

class Ending extends React.Component{
    /**
     * Return to the main menu of the game
     */
    returnToMenu(){
        ReactDOM.render(
            <Menu/>,document.getElementsByClassName("App-header")[0]
        );
    }

    /**
     * Close the end page to display the map
     */
    closeEnding(){
        let savedProgression = JSON.parse(localStorage.getItem("progression"));
        let title = savedProgression["title"];
        let gameID = title.substring(0, title.indexOf("/"));
        const wrapper = new Wrapper(title);

        ReactDOM.render(
            <Map resume={true} wrapper={wrapper} geolocation={true} gameID={gameID}/>,
            document.getElementsByClassName("App-header")[0]
        );
    }


    render(){
        return (
            <div id="ending">
                <h2>Félicitation, vous avez terminé le parcours</h2>
                <p>Merci d'avoir joué !</p>
                <button onClick={this.closeEnding}>Retourner à la carte</button>
                <button onClick={this.returnToMenu}>Retourner au menu</button>
                <footer>Cette application a été réalisée par 3 étudiants en informatique dans le cadre du projet de licence 3, sous la tutelle de <a href="https://www.femto-st.fr/fr/personnel-femto/fdadeau">Frédéric Dadeau</a>, maître de conférence à l'Université de Franche-Comté.</footer>
            </div>
        );
    }
    
} export default Ending;