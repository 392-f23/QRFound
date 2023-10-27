import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import "./Map.css"

const Map = (longitude, latitude) => {

    return (
        <MapContainer center={[42.05296, -87.68633]} zoom={13}>
            <TileLayer 
                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[42.05296, -87.68633]}/>
        </MapContainer>

    )
};

export default Map