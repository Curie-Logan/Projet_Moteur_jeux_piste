import React from 'react';
import ReactDOM from 'react-dom'

import {MapContainer, TileLayer, Marker} from 'react-leaflet';
import L from 'leaflet';

import PlaceInfo from './placeInfo/PlaceInfo';

import './Map.css';

let objet;
class Map extends React.Component {
    constructor(props){
        super(props);
        objet = this;
        if(this.props.geolocation === true){
            this.timer = window.setInterval(function(){
                navigator.geolocation.getCurrentPosition(checkPositionCloseMarker);
            }, 1000);
        }

        //Get saved progression
        const savedProgression = JSON.parse(localStorage.getItem("progression"));
        let progression = {title: savedProgression["title"], visited: [], current: "", next: [this.props.wrapper.getFirstPlace()],playerPosition : [0,0]};

        //Resume the game
        if(this.props.resume === true){
            progression["title"] = savedProgression["title"];
            progression["visited"] = savedProgression["visited"];
            progression["current"] = savedProgression["current"];
            progression["next"] = savedProgression["next"];
            progression["playerPosition"] = savedProgression["playerPosition"];
        }
        else{
            //Save the current progression in the localStorage
            localStorage.setItem("progression",JSON.stringify(progression));
        }

        this.state = {
            visited : progression.visited, 
            current : progression.current,
            next : progression.next,
            playerPosition : progression.playerPosition
        };
    }

    //Methode pour centrer la map par rapport à la position du joueur et le lieu suivant
    //Methode pour adapter le zoom de la map

    /**
     * Update the current, next and visited places when a puzzle is solved 
     * @param place the place for wich the puzzle is solved
     */
    updateState(place) {
        //Remove place from current 
        let tCurrent = this.state.current;
        let tNext = this.state.next;
        let tVisited = this.state.visited;

        tCurrent = "";
        
        //Update visited place
        tVisited.push(place);
    
        //Update current place
        let updateCurrent = this.props.wrapper.getNextPlace(place);
        
        if(Array.isArray(updateCurrent)){
            for(let next of updateCurrent) {
                if(!this.state.visited.includes(next)){
                    let indexVal = tNext.indexOf(next);
                    if (indexVal < 0) {
                        tNext.push(next);
                    }
                }
            }
        }
        
        this.setState({visited: tVisited});
        this.setState({next: tNext});
        this.setState({current: tCurrent});
        
        //Save the current progression
        let savedProgression = JSON.parse(localStorage.getItem("progression"));
        if(!savedProgression){
            savedProgression = {visited: [], current: "", next: [], puzzleValidated: [], revealedHints: []};
        }
        savedProgression["visited"] = tVisited;
        savedProgression["current"] = tCurrent;
        savedProgression["next"] = tNext;
        localStorage.setItem("progression",JSON.stringify(savedProgression));
    }

    /**
     * Handler for click on a place, 
     * display a popup with information on this place
     */
    displayInfo(place, puzzle = false){
        const div = document.createElement("div");
        div.setAttribute("id", "infoDiv");
        document.getElementsByClassName("App-header")[0].appendChild(div);

        ReactDOM.render(
            <PlaceInfo wrapper={this.props.wrapper} place={place} puzzle={puzzle} response = {callbackFunction}></PlaceInfo>,
            document.getElementById("infoDiv")
        );
        
        document.getElementById("placeInfo").scrollTop = 0;
    }

    /**
     * Function called to put the place in parameter in current place
     * @param place the place tu put as current
     */
    changerMarker(place){
        let tNext = this.state.next;
        if(this.state.current !== ""){
             tNext.push(this.state.current);
        }

        let indexVal = tNext.indexOf(place);
        if (indexVal > -1) {
            tNext.splice(indexVal, 1);
        }
        

        this.setState({next: tNext});
        this.setState({current: place});

        //Enregistrement de la progression
        let savedProgression = JSON.parse(localStorage.getItem("progression"));
        if(!savedProgression){
            savedProgression = {visited: [], current: "", next: [], puzzleValidated: [], revealedHints: []};
        }
        savedProgression["visited"] = this.state.visited;
        savedProgression["current"] = this.state.current;
        savedProgression["next"] = this.state.next;
        localStorage.setItem("progression",JSON.stringify(savedProgression));
    }

    //Centrer la map avec le point entre le joueur et le premier lieu, mais probleme avec la position du joueur qui est obtenue de manière asynchrone

    // centerF(){
    //     let t = [];
        
    //     let posFirstPlace =this.gameW.getPlacePosition(this.gameW.getFirstPlace());
    //     if(this.state.playerPosition[0] != 0 && this.state.playerPosition[1] != 0 ){
    //         t.push( (this.state.playerPosition[0] + posFirstPlace[0]) / 2);
    //         t.push( (this.state.playerPosition[1] + posFirstPlace[1])  / 2);
    //     }else{
    //         console.log("Position du joueur egal à 0");
    //         return posFirstPlace;
    //     } 

    //     return t;

    // }



    /**
     * Get the marker of the player to display on the map
     * @returns the marker of the player
     */
    displayPlayer(){
        return <Marker position={this.state.playerPosition} icon={getMarkerIcon("player")} key={"player"}></Marker>;
    }


    /**
     * Get the markers for the places to display on the map
     *  - green markers for places visited
     *  - blue markers for the current place
     *  - red markers for next places to visit
     * @returns an array of markers to display
     */
    displayMarkers(){
        var greenMarker = getMarkerIcon("green");
        var blueMarker = getMarkerIcon("blue");
        var redMarker = getMarkerIcon("red");

        var markers = []; 

        let key = 0;

        //The places visited
        for(let place of this.state.visited){
            let position = this.props.wrapper.getPlacePosition(place);
            let marker = <Marker eventHandlers={{click: () => this.displayInfo(place)}} position={position} icon={greenMarker} key={key}></Marker>;
            markers.push(marker);
            key++;
        }

        //The current place
        if(this.state.current){
            let position = this.props.wrapper.getPlacePosition(this.state.current);
            let marker = <Marker eventHandlers={{click: () => this.displayInfo(this.state.current, true)}} position={position} icon={blueMarker} key={key}></Marker>;
            markers.push(marker);
            key++;
        }

        //The next places to visit
        for(let place of this.state.next){
            let position = this.props.wrapper.getPlacePosition(place); 
            
            let marker = <Marker position={position} eventHandlers={{click: () => this.changerMarker(place)}}  icon={redMarker} key={key}/>;
            
            markers.push(marker);
            key++;
        }

        return markers;
    }

    render() {
        return (
            <MapContainer id="map"
                center = {this.props.wrapper.getPlacePosition(this.props.wrapper.getFirstPlace())} //Adapter le center
                zoom = {17} minZoom = {3} zoomControl={false}>

                <TileLayer url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>
                
                {this.displayMarkers()}
                {this.displayPlayer()}

            </MapContainer>  
        );
    }
 } export default Map;


 function checkPositionCloseMarker(pos){
    let cord = pos.coords;
    let tab = [];
    tab.push(cord.latitude);
    tab.push(cord.longitude);
    objet.setState({playerPosition: tab});
    for(let place of objet.state.next){
        let pos = objet.props.wrapper.getPlacePosition(place);
        //Precision à determiner
        if(Math.abs( (pos[0] + pos[1] ) - (cord.latitude + cord.longitude) ) < 0.00003){
            //Afficher les infos met a jour l'affichage tout le temps et donc bloque sur les infos du lieu
            //objet.displayInfo(place, true);
            //Autre solution met à jour le pin
            objet.changerMarker(place);

        }
    }
  }


 function callbackFunction(place) {
    objet.updateState(place);
  }


 /**
 * Return a marker icon of a specific color
 * @param {String} color the color of the icon
 * @returns the marker icon with the color indicated
 */
 function getMarkerIcon(color){
    var customIcon = L.Icon.extend({
        options: {
            iconUrl: "./img/map/marker_" + color + ".png", // picture of the marker
            iconSize:     [30, 30], // size of the marker
            shadowSize:   [30, 30], // size of the shadow
            iconAnchor:   [10, 30], // point of the icon which will correspond to marker's location
            shadowAnchor: [10, 30], // the same for the shadow
        }
    });

    return new customIcon();
}	