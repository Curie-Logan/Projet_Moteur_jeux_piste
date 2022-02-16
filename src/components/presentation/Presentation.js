import React from "react";
import ReactDOM from 'react-dom';
import Wrapper from "../../wrapper";
import PlaceInfo from '../map/placeInfo/PlaceInfo';
import Menu from '../menu/Menu';
 


import {MapContainer, TileLayer, Marker,Circle} from 'react-leaflet';
import L from 'leaflet';

import './Presentation.css';


let wrapper = new Wrapper("presentation/presentation.json");
let objet ;
class Presentation extends React.Component{
    constructor(props){
        super(props);
        objet = this;
        this.state = {
            step : 1 , 

        };
        if(!JSON.parse(localStorage.getItem("progression"))){
            let fakeProgression = {visited: [], current: "", next: [], puzzleValidated: [], revealedHints: [],presentation: true};

            localStorage.setItem("progression",JSON.stringify(fakeProgression));
        }
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
            <PlaceInfo wrapper={wrapper} place={place} puzzle={puzzle} response = {callbackFunction}></PlaceInfo>,
            document.getElementById("infoDiv")
        );
        
        document.getElementById("placeInfo").scrollTop = 0;
    }


    displayMarkersPresentation(){
        var greenMarker = getMarkerIcon("green");
        var blueMarker = getMarkerIcon("blue");
        var redMarker = getMarkerIcon("red");
        var ret = [];
        let marker;
        var key = 30;

        switch(this.state.step){
            case 4 :
            case 1 :
                let c =  <Circle  center={[41.8901, 12.4923]} radius={25} key= {key}/>;
                key++;
                marker = <Marker position={[41.8901, 12.4923]} eventHandlers={{click: () => { this.changePresentation(); }, }} icon={redMarker} key={key} /> ;
                key++;
                ret.push(c);
                ret.push(marker);
                break;
            case 2 :
                marker = <Marker position={[41.8901, 12.4923]} eventHandlers={{click: () => this.displayInfo("colisee", true)}} icon={blueMarker} key={key} /> ;
                key++;
                ret.push(marker);
                break;
            case 3 :
                marker = <Marker position={[41.8901, 12.4923]} eventHandlers={{click: () => this.displayInfo("colisee", false)}} icon={greenMarker} key={key} /> ;
                key++;
                let marker1 = <Marker position={[41.8901, 12.4929]} eventHandlers={{click: () => { this.changePresentation(); }, }} icon={redMarker} key={key} /> ;
                key++;
                let marker2 = <Marker position={[41.8911, 12.4923]} eventHandlers={{click: () => { this.changePresentation(); }, }} icon={redMarker} key={key} /> ;
                ret.push(marker);                
                ret.push(marker1);
                ret.push(marker2);
                key++;
                break;
            default :
                break;
          
        }
         return ret;
    }



    changePresentation(){
        if(this.state.step === 4){
            this.setState({step: 1});
        }else{
            this.setState({step: this.state.step + 1});

        }
    }

    handlerClosePresentation(){
        //Return to the menu
        ReactDOM.render(
            <Menu/>,document.getElementsByClassName("App-header")[0]
        );
    }

    displayContain(){
        let contenue = [];
        contenue.push(<button onClick={this.handlerClosePresentation} id="closeButton">X</button>);
        switch(this.state.step){
                case 4 :
                case 1 :
                    contenue.push(<p id="contenue">On peut accéder à un marqueur en rouge en étant dans la zone proche si le GPS est activé (en bleu ici). Si le gps ne fonctionne pas on peut cliquer sur le marqueur pour y accéder.</p>);
                    break;
                case 2 :
                    contenue.push(<p id="contenue">Une fois à proximité du lieu, le marqueur devient bleu et on peut accéder aux informations du lieu en cliquant dessus.</p>);
                    break;
                case 3 :
                    contenue.push(<p id="contenue">Une fois l'énigme complétée le marqueur devient vert,les informations du lieu peuvent être reconsultées et les prochains marqueurs sont affichés(en rouge). Vous disposez de toutes les informations nécessaires au déroulement du jeu ! </p>);
                    break;
                default :
                    break;    
                }
        return contenue;

    }

    render(){
        return (
            <MapContainer id="map"
                
            center={[ 41.89097795180586, 12.491085966766292 ]}
                    //Adapter le center
                zoom = {17} minZoom = {3} zoomControl={false}>

                <TileLayer url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>
                
                {this.displayMarkersPresentation()}
                {this.displayContain()}


            </MapContainer>
        );
    }
}

export default Presentation;

function callbackFunction() {
    objet.changePresentation();
  }


function getMarkerIcon(color){
    var customIcon = L.Icon.extend({
        options: {
            iconUrl: "./img/map/marker_" + color + ".png", // picture of the marker
            iconSize:     [30, 30], // size of the marker
            shadowSize:   [30, 30], // size of the shadow
            iconAnchor:   [17, 30], // point of the icon which will correspond to marker's location
            shadowAnchor: [17, 30], // the same for the shadow
            popupAnchor:  [-1, -50],// point from which the popup should open relative to the iconAnchor
        }
    });

    return new customIcon();
}