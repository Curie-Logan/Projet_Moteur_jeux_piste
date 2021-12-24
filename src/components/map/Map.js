import React from 'react';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import L from 'leaflet';

import './Map.css';

class Map extends React.Component {
    constructor(props){
        super(props);
        this.gameW = this.props.wrapper; 
        this.state = {
            visited : ["aqua", "bu_sciences"],
            next : ["bu_droit", "petit_bouloie"]
        };
    }

    //Methode pour centrer la map par rapport à la position courante et les lieux suivants
    //Methode pour calculer le zoom

    /**
     * Return a marker icon of a specific color
     * @param {String} color the color of the icon
     * @returns the marker icon with the color indicated
     */
    getMarkerIcon(color){
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

    /**
     * Get the markers for the places to display on the map
     *  - green markers for places visited
     *  - red markers for next places to visit
     * @returns an array of markers to display
     */
    displayMarkers(){
        var greenMarker = this.getMarkerIcon("green");
        var redMarker = this.getMarkerIcon("red");

        var markers = [];

        let key = 0;
        for(let place of this.state.visited){
            let position = this.gameW.getPlacePosition(place);
            markers.push(<Marker position={position} icon={greenMarker} key={key}></Marker>);
            key++;
        }

        for(let place of this.state.next){
            let position = this.gameW.getPlacePosition(place);
            markers.push(<Marker position={position} icon={redMarker} key={key}></Marker>);
            key++;
        }

        return markers;
    }

    render() {
        return (
            <MapContainer
                className = "container"
                center = {[47.245857, 5.987072]}
                zoom = {17} >

                <TileLayer
                    url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>

                {this.displayMarkers()}
            </MapContainer>  
        );
    }
 }

 export default Map;
