import React from "react";
import ReactDOM from 'react-dom';

import {MapContainer, TileLayer, Marker,Circle} from 'react-leaflet';
import L from 'leaflet';

import Wrapper from "../../../wrapper";
import PlaceInfo from '../../map/placeInfo/PlaceInfo';
import Menu from '../../menu/Menu';
 
import './Tutorial.css';

let component ;
class Tutorial extends React.Component{
    constructor(props){
        super(props);
        component = this;
        this.state = {step : 1};
        this.wrapper = new Wrapper("tutorial/tutorial.json");
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
            <PlaceInfo wrapper={this.wrapper} place={place} puzzle={puzzle} response = {callbackFunction}/>,
            document.getElementById("infoDiv")
        );
        
        document.getElementById("placeInfo").scrollTop = 0;
    }

    /**
     * Get the markers to display for each step of the tutorial
     * @returns an array of markers to display
     */
    getMarkersTutorial(){
        var greenMarker = getMarkerIcon("green");
        var blueMarker = getMarkerIcon("blue");
        var redMarker = getMarkerIcon("red");

        var markers = [];

        switch(this.state.step){
            case 4 :
            case 1 :
                markers.push(<Marker position={[41.89005, 12.49225]} eventHandlers={{click: () => this.nextStep()}} icon={redMarker}/>);
                markers.push(<Circle center={[41.89010, 12.49230]} radius={25}/>);
                break;
            case 2 :
                markers.push(<Marker position={[41.89005, 12.49225]} eventHandlers={{click: () => this.displayInfo("colisee", true)}} icon={blueMarker}/>);
                markers.push(<Marker position={[41.88994, 12.49209]} icon={getMarkerIcon("player")}/>);
                break;
            case 3 :
                markers.push(<Marker position={[41.89005, 12.49225]} eventHandlers={{click: () => this.displayInfo("colisee", false)}} icon={greenMarker}/>);                
                markers.push(<Marker position={[41.88976, 12.49067]} eventHandlers={{click: () => this.nextStep()}} icon={redMarker}/>);
                markers.push(<Marker position={[41.89061, 12.49148]} eventHandlers={{click: () => this.nextStep()}} icon={redMarker}/>);
                markers.push(<Marker position={[41.88994, 12.49209]} icon={getMarkerIcon("player")}/>);
                break;
            default :
                break;
        }

        return markers;
    }

    /**
     * Get the explanation to display for each step of the tutorial
     * @returns the explanation to display
     */
    getExplanation(){
        let content = [];
        content.push(<button onClick={this.handlerCloseTutorial} id="closeButton">X</button>);
        switch(this.state.step){
                case 4 :
                case 1 :
                    content.push(
                        <div id="explanation">
                            <p>Les marqueurs rouges indiquent un lieu clé du parcours.</p>
                            <p>En s'y approchant suffisamment, dans un périmètre proche délimité ici en bleu, des informations sur ce lieu vous seront données.</p> 
                            <p>Dans le cas où le GPS n'est pas activé il est possible d'accéder à ces informations en cliquant sur le marqueur du lieu une fois sur place.</p>
                        </div>
                    );
                    break;
                case 2 :
                    content.push(
                        <div id="explanation">
                            <p>Une fois votre personnage à proximité du lieu, le marqueur devient bleu et vous pouvez accéder aux informations et à l'énigme relative au lieu en cliquant dessus.</p>
                        </div>
                    );
                    break;
                case 3 :
                    content.push(
                        <div id="explanation">
                            <p>Une fois l'énigme résolue le marqueur devient vert pour indiquer que ce lieu a été visité, ses informations sont toujours consultables, et les prochains lieux à visiter apparaissent en rouge.</p>
                            <p>Vous disposez désormais de toutes les informations nécessaires au fonctionnement du jeu.</p>
                        </div>);
                    break;
                default :
                    break;    
                }
        return content;
    }

    /**
     * Go to the next step of the tutorial
     */
     nextStep(){
        if(this.state.step === 4){
            this.setState({step: 1});
        }else{
            this.setState({step: this.state.step + 1});
        }
    }

    /**
     * Close the tutorial and return to the main menu
     */
    handlerCloseTutorial(){
        ReactDOM.render(
            <Menu/>, document.getElementsByClassName("App-header")[0]
        );
    }

    render(){
        return (
            <MapContainer id="tutorial"
                center={[41.891404245383384, 12.491716829545517]}
                zoom = {17} minZoom = {3} zoomControl={false}>

                <TileLayer url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>
                
                {this.getMarkersTutorial()}
                {this.getExplanation()}
            </MapContainer>
        );
    }

} export default Tutorial;

function callbackFunction() {
    component.nextStep();
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