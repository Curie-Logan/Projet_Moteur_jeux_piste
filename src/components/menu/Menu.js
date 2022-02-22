import React from "react";
import ReactDOM from 'react-dom'

import Wrapper from "../../wrapper";
import Map from "../map/Map";
import Tutorial from "../tutorial/Tutorial";

import './Menu.css';

class Menu extends React.Component{
    /**
     * Print the buttons to continue or start a new game and the button to see the tutorial
     */
    componentDidMount(){
        const options = document.createElement("div");
        options.setAttribute("id","options");

        //Search an existing game progression in the local storage
        if(JSON.parse(localStorage.getItem("progression"))){
            //Create the continue button
            const resumeButton = document.createElement("button");
            resumeButton.innerText = "Continuer la partie en cours";
            resumeButton.onclick = this.resumeGame;
            options.appendChild(resumeButton);
        }

        //Create the new game button
        const newGameButton = document.createElement("button");
        newGameButton.innerText = "Démarrer une nouvelle partie";
        newGameButton.onclick = this.printGamesList;
        options.appendChild(newGameButton);

        //Create the tutorial button
        const tutorialButton = document.createElement("button");
        tutorialButton.addEventListener("click", this.showTutorial);
        tutorialButton.innerText = "Comment jouer";
        options.appendChild(tutorialButton);

        //Add the buttons to the menu
        document.getElementById("menu").appendChild(options);
    }

    /**
     * Show the tutorial of the game
     */
    showTutorial(){
        let menu = document.getElementById("menu");
        const div = document.createElement("div");
        div.setAttribute("id", "tutorial");
        document.getElementsByClassName("App-header")[0].appendChild(div);

        ReactDOM.render(
            <Tutorial/>, document.getElementsByClassName("App-header")[0]
        );
        menu.appendChild(div);
    }

    /**
     * Resume a game in progress
     */
    resumeGame(){
        let savedProgression = JSON.parse(localStorage.getItem("progression"));
        let title = savedProgression["title"];
        const wrapper = new Wrapper(title);
        let gameID = title.substring(0, title.indexOf("/"));

        ReactDOM.render(
            <Map resume={true} wrapper={wrapper} geolocation={true} gameID={gameID}/>,
            document.getElementsByClassName("App-header")[0]
        );
    }

    /**
     * Print the list of the available games
     */
    printGamesList(){
        const data = new Wrapper().getGameList();
        const menu = document.getElementById("menu");
        menu.innerHTML = "";
        
        const title = document.createElement("h2");
        title.innerText = "Choisissez un parcours";
        menu.appendChild(title);

        const gamesList = document.createElement("div");
        gamesList.setAttribute("id", "gamesList");

        for(let [gameID, title] of Object.entries(data)){
            const gameButton = document.createElement("button");
            gameButton.setAttribute("class", "game");
            gameButton.setAttribute("id", gameID);
            gameButton.setAttribute("key", gameID);
            gameButton.innerText = title;

            gamesList.appendChild(gameButton);

            gameButton.addEventListener("click", function(){
                //Save the current progression
                let savedProgression = {title: `${gameID}/${gameID}.json`, 
                                        visited: [], 
                                        current: "", 
                                        next: [], 
                                        puzzleValidated: [], 
                                        revealedHints: []};
                localStorage.setItem("progression",JSON.stringify(savedProgression));

                //Create a wrapper for the file of the selected game
                const wrapper = new Wrapper(`${gameID}/${gameID}.json`);

                ReactDOM.render(
                    <Map resume={false} wrapper={wrapper} geolocation={true} gameID={gameID}/>,
                    document.getElementsByClassName("App-header")[0]
                );
            });
            menu.appendChild(gamesList);
        }

        //The button to return to the main menu
        const returnButton = document.createElement("button");
        returnButton.innerText = "Retourner au menu";
        returnButton.setAttribute("id", "returnMenu");
        returnButton.addEventListener("click", function(){
            // ReactDOM.render(
            //     <Menu/>,document.getElementsByClassName("App-header")[0]
            // );
            window.location.reload();
        });

        menu.appendChild(returnButton);
    }
    
    render(){
        return (
            <div id="menu">
                <h1>Jeu de piste</h1>
            </div>
        );
    }
} export default Menu;