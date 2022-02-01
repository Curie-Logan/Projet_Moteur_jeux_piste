import React from "react";
import ReactDOM from 'react-dom'
import './Menu.css';

import Map from "../map/Map";
import Wrapper from "../../wrapper";

class Menu extends React.Component{
    componentDidMount(){
        //Print the new/continue game buttons
        const options = document.createElement("div");
        options.setAttribute("id","options");

        if(JSON.parse(localStorage.getItem("progression"))){
            const resumeButton = document.createElement("button");
            resumeButton.innerText = "Continuer la partie en cours";
            resumeButton.onclick = this.resumeGame;
            options.appendChild(resumeButton);
        }
        const newGameButton = document.createElement("button");
        newGameButton.innerText = "Démarrer une nouvelle partie";
        newGameButton.onclick = this.printGameList;
        options.appendChild(newGameButton);

        const presentation = document.createElement("button");
        presentation.addEventListener("click",this.printPresentation);
        presentation.innerText = "Présentation de l'application et de son fonctionnement";
        options.appendChild(presentation);

        document.getElementById("menu").appendChild(options);
    }

    //TO DO
    printPresentation(){

    }

    resumeGame(){
        document.getElementById("menu").remove();
        
        let savedProgression = JSON.parse(localStorage.getItem("progression"));
        const wrapper = new Wrapper(savedProgression["title"]);

        ReactDOM.render(
            <Map resume={true} wrapper={wrapper} geolocation={true}/>,
            document.getElementsByClassName("App-header")[0]
        );
    }

    /**
     * Print the list of the saved games in the public directory to the menu
     */
    printGameList(){
        // const data = require("../../gameList.json");
        const data = new Wrapper().getGameList();
        document.getElementById("menu").innerHTML = "";
        
        const title = document.createElement("h2");
        title.innerText = "Choississez un parcours";
        
        const menu = document.getElementById("menu");
        menu.appendChild(title);

        const divGames = document.createElement("div");
        divGames.setAttribute("id","divGames");

        for(let [gameID, title] of Object.entries(data)){
            const gameButton = document.createElement("p");
            gameButton.setAttribute("class","game");
            gameButton.setAttribute("id",gameID);
            gameButton.setAttribute("key",gameID);
            gameButton.innerText = title;

            divGames.appendChild(gameButton);

            gameButton.addEventListener("click",function(){
                menu.remove();    
                const wrapper = new Wrapper(gameID+"/"+gameID+".json");

                //Save the current progression
                let savedProgression = {title: gameID+"/"+gameID+".json", visited: [], current: "", next: [], puzzleValidated: [], revealedHints: []};
           
                localStorage.setItem("progression",JSON.stringify(savedProgression));

                ReactDOM.render(
                    <Map resume={false} wrapper={wrapper} geolocation={true}/>,
                    document.getElementsByClassName("App-header")[0]
                );
            });

            menu.appendChild(divGames);
        }
    }
    
    
    render(){
        return (
            <div id="menu">
                <h1>Jeu de piste</h1>
            </div>
        );
    }
}

export default Menu;