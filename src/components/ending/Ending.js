import React from "react";
import './Ending.css';
import ReactDOM from "react-dom";
import Menu from '../menu/Menu';
import Map from "../map/Map";
import Wrapper from "../../wrapper";

class Ending extends React.Component{

    returnToMenu(){
        //Reset the localStorage
        localStorage.setItem("progression",JSON.stringify(""));

        //Reload the game
        ReactDOM.render(
            <Menu/>,document.getElementsByClassName("App-header")[0]
        );
    }

    closeEnding(){
        let savedProgression = JSON.parse(localStorage.getItem("progression"));
        const wrapper = new Wrapper(savedProgression["title"]);

        ReactDOM.render(
            <Map resume={true} wrapper={wrapper} geolocation={true}/>,
            document.getElementsByClassName("App-header")[0]
        );
    }


    render(){
        return (
            <div id="ending">
                <h1>Félicitation, vous avez terminé le parcours</h1>
                <h2>Merci d'avoir joué !</h2>
                <button onClick={this.closeEnding}>Retourner à la carte</button>
                <button onClick={this.returnToMenu}>Retourner à l'accueil</button>
                <footer>Cette application a été réalisée par 3 étudiants en informatique dans le cadre du projet de licence 3, sous la tutelle de <a href="https://www.femto-st.fr/fr/personnel-femto/fdadeau">Frédéric Dadeau</a>, maître de conférence à l'Université de Franche-Comté.</footer>
            </div>
        );
    }
}

export default Ending;