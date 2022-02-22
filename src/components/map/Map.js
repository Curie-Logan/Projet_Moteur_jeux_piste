import React from 'react';
import ReactDOM from 'react-dom'

import {MapContainer, TileLayer, Marker, useMap} from 'react-leaflet';
import L from 'leaflet';

import PlaceInfo from './placeInfo/PlaceInfo';
import Ending from '../ending/Ending';

import './Map.css';
<<<<<<< HEAD
import Ending from '../ending/Ending';
import { LatLng } from 'leaflet';
=======
>>>>>>> d4c2bd87fdcec935962247a551d20237e4e55fa8

let component;
class Map extends React.Component {
    constructor(props){
        super(props);
        component = this;
        if(this.props.geolocation === true){
            this.timer = window.setInterval(function(){navigator.geolocation.getCurrentPosition(checkPlayerCloseMarker);}, 1000);
        }

        //Get saved progression
        const savedProgression = JSON.parse(localStorage.getItem("progression"));
        let progression = { title: savedProgression["title"], 
                            visited: [], 
                            current: "", 
                            next: [this.props.wrapper.getFirstPlace()]};

        //Resume the game
        if(this.props.resume === true){
            progression["title"] = savedProgression["title"];
            progression["visited"] = savedProgression["visited"];
            progression["current"] = savedProgression["current"];
            progression["next"] = savedProgression["next"];
        }else{
            //Save the current progression in the localStorage
            localStorage.setItem("progression",JSON.stringify(progression));
        }

        this.state = {
            visited : progression.visited, 
            current : progression.current,
            next : progression.next,
            playerPosition : []
        };
    }

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

        //All the places of the course were visited, the game is finish
        if(this.state.next.length === 0){
            ReactDOM.render(
                <Ending/>,
                document.getElementsByClassName("App-header")[0]
            );
        }

        //Save the current progression
        let savedProgression = JSON.parse(localStorage.getItem("progression"));
        if(!savedProgression){
            savedProgression = {visited: [], 
                                current: "", 
                                next: [], 
                                puzzleValidated: [], 
                                revealedHints: []};
        }
        savedProgression["visited"] = tVisited;
        savedProgression["current"] = tCurrent;
        savedProgression["next"] = tNext;
        localStorage.setItem("progression",JSON.stringify(savedProgression));
    }

    /**
     * Handler when the player is near a place, 
     * display a popup with informations on this place
     */
    displayInfo(place, puzzle = false){
        const div = document.createElement("div");
        div.setAttribute("id", "infoDiv");
        document.getElementsByClassName("App-header")[0].appendChild(div);

        ReactDOM.render(
            <PlaceInfo wrapper={this.props.wrapper} place={place} puzzle={puzzle} gameID={this.props.gameID} response = {callbackFunction}/>,
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
        if(!savedProgression || savedProgression["presentation"] ){
            savedProgression = {visited: [], 
                                current: "", 
                                next: [], 
                                puzzleValidated: [], 
                                revealedHints: []};
        }
        savedProgression["visited"] = this.state.visited;
        savedProgression["current"] = this.state.current;
        savedProgression["next"] = this.state.next;
        localStorage.setItem("progression",JSON.stringify(savedProgression));
    }
    
    /**
     * Handler when the player click on a marker (use in degraded mode without GPS)
     * @param place the place on which the player clicked
     * @param puzzle indicate if a puzzle must be proposed or not
     */
    handlerClickPin(place, puzzle = false){
        this.changerMarker(place);
        this.displayInfo(place, puzzle);
    }

    /**
     * Get the marker of the player to display on the map
     * @returns the marker of the player
     */
<<<<<<< HEAD
    displayPlayer(){
        if(this.props.geolocation === true){
            if(this.state.playerPosition.length != 0){
            return <Marker position={this.state.playerPosition} icon={getMarkerIcon("player")} key={999}></Marker>;
            }
        }
    }

    // displayCenter(){
    //     if(this.props.resume === true){
    //         let avgLong = 0;
    //         let avgLat = 0;
    //         let size = 0;
    
    //         if(Array.isArray(this.state.visited)){
    //             for(let place of this.state.visited){
    //                 let position = this.props.wrapper.getPlacePosition(place);
    //                 console.log("current");
    //                 console.log(position);
    //                 avgLong += position[0];
    //                 avgLat += position[1];
    //                 size++;
    //             }
    //         }else{
    //             let position = this.props.wrapper.getPlacePosition(this.state.visited);
    //             console.log(position);
    //             avgLong += position[0];
    //             avgLat += position[1];
    //             size++;
    //         }
    
            
    //         if(this.state.current){
    
    //             console.log(this.state.current);
    //             let position = this.props.wrapper.getPlacePosition(this.state.current);
    //             console.log(position);
    //             avgLong += position[0];
    //             avgLat += position[1];
    //             size++;
    //         }
        
    //         if(Array.isArray(this.state.next)){
    //             for(let place of this.state.next){
    //                 let position = this.props.wrapper.getPlacePosition(place);
    //                 console.log("current");
    //                 console.log(position);
    //                 avgLong += position[0];
    //                 avgLat += position[1];
    //                 size++;
    
    //             }
    //         }else{
    //             let position = this.props.wrapper.getPlacePosition(this.state.next);
    //             console.log(position);
    //             avgLong += position[0];
    //             avgLat += position[1];
    //             size++;
    
    //         }
    
    
    
    //         avgLong = avgLong / size;
    
    //         avgLat = avgLat / size ;
    //         let center = <LatLng> coords={[avgLong,avgLat]}</LatLng>
    //         m.fitBounds([
    //             [40.712, -74.227],
    //             [40.774, -74.125]
    //         ]);
    //         console.log(m);
            
    //     }
    //         return this.props.wrapper.getPlacePosition(this.props.wrapper.getFirstPlace());
    //     }

    displayCenter(){
        
        let t = [];

=======
     displayPlayer(){
        if(this.props.geolocation === true && this.state.playerPosition.length !== 0){
            return <Marker position={this.state.playerPosition} icon={getMarkerIcon("player")} key={this.state.playerPosition[1]}/>;
        }
    }

    /**
     * Calculates on which position the map should be centered
     * @returns the geographical position of the center of the map
     */
    calculateCenter(){
        if(this.props.resume === true){
            let avgLong = 0;
            let avgLat = 0;
            let size = 0;
>>>>>>> d4c2bd87fdcec935962247a551d20237e4e55fa8
    
            if(Array.isArray(this.state.visited)){
                for(let place of this.state.visited){
                    let position = this.props.wrapper.getPlacePosition(place);
<<<<<<< HEAD
                    t.push(position);
                }
            }else{
                let position = this.props.wrapper.getPlacePosition(this.state.visited);
                t.push(position);

            }
    
            
            if(this.state.current.length != 0){    
                let position = this.props.wrapper.getPlacePosition(this.state.current);
                t.push(position);
            }
        
            if(Array.isArray(this.state.next)){
                for(let place of this.state.next){
                    let position = this.props.wrapper.getPlacePosition(place);
                    t.push(position);    
                }
            }else{
                let position = this.props.wrapper.getPlacePosition(this.state.next);
                t.push(position);    
            }
    
                if(!Array.isArray(t[0]) ){
                t.push(this.props.wrapper.getPlacePosition(this.props.wrapper.getFirstPlace()));
            }
            return t;
    
=======
                    avgLong += position[0];
                    avgLat += position[1];
                    size++;
                }
            }else{
                let position = this.props.wrapper.getPlacePosition(this.state.visited);
                avgLong += position[0];
                avgLat += position[1];
                size++;
            }
    
            if(this.state.current){
                let position = this.props.wrapper.getPlacePosition(this.state.current);
                avgLong += position[0];
                avgLat += position[1];
                size++;
            }
    
            if(Array.isArray(this.state.next)){
                for(let place of this.state.next){
                    let position = this.props.wrapper.getPlacePosition(place);
                    avgLong += position[0];
                    avgLat += position[1];
                    size++;
                }
            }else{
                let position = this.props.wrapper.getPlacePosition(this.state.next);
                avgLong += position[0];
                avgLat += position[1];
                size++;
    
            }
    
            avgLong = avgLong / size;
            avgLat = avgLat / size ;

            return [avgLong,avgLat];
>>>>>>> d4c2bd87fdcec935962247a551d20237e4e55fa8
        }

        return this.props.wrapper.getPlacePosition(this.props.wrapper.getFirstPlace());
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
            markers.push(<Marker eventHandlers={{click: () => this.displayInfo(place)}} position={position} icon={greenMarker} key={key}/>);
            key++;
        }

        //The current place
        if(this.state.current){
            let position = this.props.wrapper.getPlacePosition(this.state.current);
            markers.push(<Marker eventHandlers={{click: () => this.displayInfo(this.state.current, true)}} position={position} icon={blueMarker} key={key}/>);
            key++;
        }

        //The next places to visit
        for(let place of this.state.next){
            let position = this.props.wrapper.getPlacePosition(place); 
            markers.push(<Marker position={position} eventHandlers={{click: () => this.handlerClickPin(place, true)}}  icon={redMarker} key={key}/>);
            key++;
        }

        return markers;
    }

    render() {

        return (
            <MapContainer id="map"
<<<<<<< HEAD
                center = {this.props.wrapper.getPlacePosition(this.props.wrapper.getFirstPlace())} zoom = {17} minZoom = {3} zoomControl={true}>
=======
                center = {this.calculateCenter()}
                zoom = {17} minZoom = {3} zoomControl={false}>

>>>>>>> d4c2bd87fdcec935962247a551d20237e4e55fa8
                <TileLayer url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>
                {this.displayMarkers()}
                {this.displayPlayer()}
                <Center/>
            </MapContainer>  
        );
    }

<<<<<<< HEAD
 function Center() {
    const map = useMap()
    map.fitBounds(objet.displayCenter())
    return null
  }
=======
} export default Map;
>>>>>>> d4c2bd87fdcec935962247a551d20237e4e55fa8


/**
 * Check that the player using his geolocation is close to a place to visit
 * @param pos 
 */
function checkPlayerCloseMarker(pos){
    let cord = pos.coords;
    let playerPos = [];
    playerPos.push(cord.latitude);
    playerPos.push(cord.longitude);
    component.setState({playerPosition: playerPos});
    for(let place of component.state.next){
        let pos = component.props.wrapper.getPlacePosition(place);
        if(Math.abs((pos[0] + pos[1]) - (cord.latitude + cord.longitude)) < 0.00012){
            component.changerMarker(place);
        }
    }
}

function callbackFunction(place) {
    component.updateState(place);
}

/**
 * Return a specific marker icon
 * @param {String} icon the type of icon (a colored pin or the player icon)
 * @returns the marker icon desired
 */
function getMarkerIcon(icon){
    var customIcon = L.Icon.extend({
        options: {
            iconUrl: "./img/map/marker_" + icon + ".png", // picture of the marker
            iconSize:     [30, 30], // size of the marker
            shadowSize:   [30, 30], // size of the shadow
            iconAnchor:   [10, 30], // point of the icon which will correspond to marker's location
            shadowAnchor: [10, 30], // the same for the shadow
        }
    });

    return new customIcon();
}	