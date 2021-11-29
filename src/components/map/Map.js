import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

class Map extends React.Component {
    state = {
        lat: 47.244954,
        lng: 5.988162,
        zoom: 22,
    }
    
    render() {
        return (
            <MapContainer
                center={[this.state.lat, this.state.lng]} 
                zoom={this.state.zoom} 
                style={{ width: '100%', height: '900px'}}
            >

                <TileLayer
                    url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    
                    // attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[this.state.lat, this.state.lng]}>
                    <Popup>
                        Hop ya une énigme qui pop
                    </Popup>
                </Marker>

            </MapContainer>  
        );
    }
 }

 export default Map;
