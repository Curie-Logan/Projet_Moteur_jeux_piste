import React from 'react';
import ReactDOM from 'react-dom'

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';

import PlaceInfo from './placeInfo/PlaceInfo';

import './Map.css';

class Map extends React.Component {
    constructor(props){
        super(props);
        this.gameW = this.props.wrapper; 
        this.state = {
            //la position gps du joueur ?
            visited : ["aqua"], 
            current : "bu_sciences",
            next : ["bu_droit", "petit_bouloie"]
        };
    }

    //Methode pour centrer la map par rapport à la position du joueur et le lieu suivant
    //Methode pour adapter le zoom de la map


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
            <PlaceInfo wrapper={this.gameW} place={place} puzzle={puzzle}></PlaceInfo>,
            document.getElementById("infoDiv")
        );
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
            let position = this.gameW.getPlacePosition(place); 
            let name = this.gameW.getPlaceName(place);
            
            let popup = <Popup>{name}</Popup>;
            let marker = <Marker position={position} icon={redMarker} key={key}>{popup}</Marker>;
            
            markers.push(marker);
            key++;
        }

        return markers;
    }

    render() {
        return (
            <MapContainer
                className = "container"
                center = {[47.245857, 5.987072]} //Adapter le center
                zoom = {17} 
                style={{position: 'absolute', zIndex: 0}}>

                <TileLayer
                    url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>

                {this.displayMarkers()}
            </MapContainer>  
        );
    }
 } export default Map;
 
 /**
 * Return a marker icon of a specific color
 * @param {String} color the color of the icon
 * @returns the marker icon with the color indicated
 */
 function getMarkerIcon(color){
    var customIcon = L.Icon.extend({
        options: {
            iconUrl: "./img/marker_" + color + ".png", // picture of the marker
            iconSize:     [50, 50], // size of the marker
            shadowSize:   [50, 50], // size of the shadow
            iconAnchor:   [27, 50], // point of the icon which will correspond to marker's location
            shadowAnchor: [27, 50], // the same for the shadow
            popupAnchor:  [-1, -50],// point from which the popup should open relative to the iconAnchor
        }
    });

    return new customIcon();
}
