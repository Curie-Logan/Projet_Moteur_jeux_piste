import React from "react";
import ReactDOM from 'react-dom'
import './Ending.css';


class Ending extends React.Component{
    componentDidMount(){
        
    }

    
    render(){
        return (
            <div id="ending">
                <h1>Félicitation, vous avez terminé le parcours</h1>
                <h2>Merci d'avoir joué !</h2>
                <footer>Cette application a été réalisée par 3 étudiants en informatique dans le cadre du projet de licence 3, sous la tutelle de <a href="https://www.femto-st.fr/fr/personnel-femto/fdadeau">Frédéric Dadeau</a>, maître de conférence à l'Université de Franche-Comté.</footer>
            </div>
        );
    }
}

export default Ending;