import React from 'react';

import PWAPrompt from 'react-ios-pwa-prompt'
import Menu from '../menu/Menu';

import './App.css';

class App extends React.Component{
	render(){
		return (
			<div className="App">
				<header className="App-header">
					<Menu/>
					<PWAPrompt 	copyTitle="Ajouter à l'écran d'accueil" 
								copyBody="Ajoutez l'application à votre écran d'accueil pour l'utiliser en plein écran et hors ligne"
								copyShareButtonLabel="1) Appuyez sur le bouton pour partager"
								copyAddHomeButtonLabel="2) Sélectionnez 'Ajouter à l'écran d'accueil'"
								copyClosePrompt="Annuler"
								permanentlyHideOnDismiss={false}/>
				</header>
			</div>
		);
	}
} export default App;