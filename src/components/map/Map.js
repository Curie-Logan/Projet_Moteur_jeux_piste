import React from 'react';
import ReactDOM from 'react-dom'

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';

import PlaceInfo from './placeInfo/PlaceInfo';

import './Map.css';
let objet;


// let options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
//   };
class Map extends React.Component {
    constructor(props){
        super(props);
        objet = this;
        // this.timer = window.setInterval(function(){
        //     navigator.geolocation.watchPosition(checkPositionCloseMarker,error,options);
        //     i++;
        //   }, 9000);
        this.gameW = this.props.wrapper; 

        let progression = {visited: [], current: "", next: [this.props.wrapper.getFirstPlace()]};

        //Reprise ou non de partie
        if(this.props.resume===true){
            //Récupération de la progression
            const savedProgression = JSON.parse(localStorage.getItem("progression"));
            if(savedProgression){
                progression["visited"] = savedProgression["visited"];
                progression["current"] = savedProgression["current"];
                progression["next"] = savedProgression["next"];
            }
            else{
                //TO DO --> pas de partie à reprendre
            }
        }
        else{
            //Enregistrement de la progression dans le localStorage
            localStorage.setItem("progression",JSON.stringify(progression));
        }

        this.state = {
            //la position gps du joueur ?
            visited : progression.visited, 
            current : progression.current,
            next : progression.next
        };
    }


    

    //Methode pour centrer la map par rapport à la position du joueur et le lieu suivant
    //Methode pour adapter le zoom de la map

    //Methode qui 
    updateState(place) {
        //Remove place from current 
        let tCurrent = this.state.current;
        let tNext = this.state.next;
        let tVisited = this.state.visited;


        tCurrent = "";

        
        //Update visited place
        tVisited.push(place);
    
        //Update current place

        let updateCurrent = this.gameW.getNextPlace(place);
        

        if(Array.isArray(updateCurrent)){
            for(let next of updateCurrent) {
                let indexVal = tNext.indexOf(next);
                if (indexVal < 0) {
                    tNext.push(next);
                }
            }
        }else{
            let indexVal = tNext.indexOf(updateCurrent);
            if (indexVal < 0) {
                tNext.push(updateCurrent);
            }
        }
        this.setState({visited: tVisited});
        this.setState({next: tNext});
        this.setState({current: tCurrent});
        
        //Enregistrement de la progression
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
        //Voir pour supprimer cette div, car elle est un peu "inutile" dans le DOM
        const div = document.createElement("div");
        div.setAttribute("id", "infoDiv");
        document.getElementsByClassName("App-header")[0].appendChild(div);
        ReactDOM.render(
            <PlaceInfo wrapper={this.gameW} place={place} puzzle={puzzle} response = {callbackFunction}></PlaceInfo>,
            document.getElementById("infoDiv")
        );
    }

    //Methode provisoire qui permet de se deplacer sur un marker(Next) en cliquant dessus
    changerMarker(place){
        let tNext = this.state.next;
        if(this.state.current != ""){
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
            console.log(place);

            let position = this.gameW.getPlacePosition(place);
            let marker = <Marker eventHandlers={{click: () => this.displayInfo(place)}} position={position} icon={greenMarker} key={key}></Marker>;
            markers.push(marker);
            key++;
        }

        //The current place
        if(this.state.current){
            let position = this.gameW.getPlacePosition(this.state.current);
            let marker = <Marker eventHandlers={{click: () => this.displayInfo(this.state.current, true)}} position={position} icon={blueMarker} key={key}></Marker>;
            markers.push(marker);
            key++;
        }

        //The next places to visit
        for(let place of this.state.next){
            console.log(place);
            let position = this.gameW.getPlacePosition(place); 
            let name = this.gameW.getPlaceName(place);
            
            let popup = <Popup>{name}</Popup>;
            let marker = <Marker position={position} eventHandlers={{click: () => this.changerMarker(place)}}  icon={redMarker} key={key}>{popup}</Marker>;
            
            markers.push(marker);
            key++;
        }

        return markers;
    }

    render() {
        return (
            <MapContainer id="map"
                center = {[47.245857, 5.987072]} //Adapter le center
                zoom = {17} minZoom = {3} zoomControl={false}>

                <TileLayer url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>
                
                {this.displayMarkers()}
            </MapContainer>  
        );
    }
 } export default Map;

//---- Test geolocalisation, probleme de precision, car gps du navigateur pas assez precis 


//  function checkPositionCloseMarker(pos){
//     let cord = pos.coords;
//     console.log(cord);

//     for(let place of objet.state.next){
//         let pos = objet.gameW.getPlacePosition(place);
//         console.log(pos);
//         if(Math.abs( (pos[0] + pos[1] ) - (cord.latitude + cord.longitude) ) < 0.03){
//             console.log("goood");
//         }


//     }
//   }

//   function error(err) {
//     console.warn('ERROR(' + err.code + '): ' + err.message);
//   }

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
            iconSize:     [50, 50], // size of the marker
            shadowSize:   [50, 50], // size of the shadow
            iconAnchor:   [27, 50], // point of the icon which will correspond to marker's location
            shadowAnchor: [27, 50], // the same for the shadow
            popupAnchor:  [-1, -50],// point from which the popup should open relative to the iconAnchor
        }
    });

    return new customIcon();
}