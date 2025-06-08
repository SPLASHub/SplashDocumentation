import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import './Map.css';

{/***************************** Function to Get Marker Icon *****************************/ }
const getMarkerIcon = (markertype) => {
    const icons = {
        default: L.icon({
            iconUrl: "/Images/defaultpin.png",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        }),
        lifeguardpost: L.icon({
            iconUrl: "/Images/lifeguard.png",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        }),
        fish: L.icon({
            iconUrl: "/Images/fish.png",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        }),
        danger: L.icon({
            iconUrl: "/Images/danger.png",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        }),
        user: L.icon({
            iconUrl: "/Images/user.png",
            iconSize: [16, 16],
            iconAnchor: [8, 16],
            popupAnchor: [0, -16]
        }),
    };
    return icons[markertype] || icons.default; 
};

{/***************************** Focus On User Location *****************************/ }
function FocusUser({ location }) {
    const map = useMap();

    useEffect(() => {
        if (location) {
            map.setView([location.x, location.y], map.getZoom(), { animate: true });
        }
    }, [location, map]);

    return null;
}

function Map() {
    {/***************************** State *****************************/ }
    const [currentLocation, setCurrentLocation] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [markers, setMarkers] = useState(null);
    const [triggerFocus, setTriggerFocus] = useState(0);
    const [hazardMenu, setHazardMenu] = useState(false);

    {/***************************** Fetch Locations *****************************/ }
    useEffect(() => {
        if (!currentLocation) {
            GetCurrentLocation();
        }
        if (!markers) {
            GetMarkers();
        }
    }, [currentLocation, markers]);

    return (
        !currentLocation ? <h1>Loading Map...</h1> : ( // Wait for map and location to load
            <section className='containerMap'>

                {/***************************** Hazard Selection Bar *****************************/ }
                <div className={hazardMenu ? "hazardBar" :"hazardBarClosed"}>
                    <div className='hbClose'>
                        <i onClick={() => setHazardMenu(false)} className='fa fa-times' />
                        <h2>Report Hazard</h2>
                    </div>

                    <div className='hbHazards'>
                        <div className='hbHazard'><img src='/Images/danger.png' alt='Danger' className='hbHIcon' /><h3>Danger</h3></div>
                        <div className='hbHazard'><img src='/Images/fish.png' alt='Animal' className='hbHIcon' /><h3>Animal</h3></div>
                        <div className='hbHazard'><h3>Rocks</h3></div>
                        <div className='hbHazard'><h3>Sea Activity</h3></div>
                    </div>
                </div>

                {/***************************** Map *****************************/ }
                <MapContainer center={[currentLocation.x, currentLocation.y]} zoom={18} scrollWheelZoom={true}>
                    {/***************************** Dependencies *****************************/}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/***************************** User Location Marker *****************************/}
                    {userLocation && (
                        <Marker position={[userLocation.x, userLocation.y]} icon={getMarkerIcon("user")}>
                            <Popup>You are here</Popup>
                        </Marker>
                    )}
                    {/***************************** Markers *****************************/}
                    {!markers ? <></> : markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={[marker.coordinates.x, marker.coordinates.y]}
                            icon={getMarkerIcon(marker.markerType)}
                        >
                            <Popup>{marker.description}</Popup>
                        </Marker>
                    ))}
                    
                    {/***************************** Focus on User Location *****************************/}
                    <FocusUser key={triggerFocus} location={userLocation || currentLocation} />
                </MapContainer>

                {/***************************** Buttons *****************************/}
                <button className='FocusButton' onClick={GetUserLocation}>
                    <i className="fa fa-crosshairs"></i>
                </button>
                <button className='AddButton' onClick={() => setHazardMenu(true)}>
                    <i className="fa fa-plus"></i>
                </button>
            </section>
        )
    );

    /***************************** Get Initial Map Location *****************************/ 
    async function GetCurrentLocation() {
        try {
            const response = await fetch('location/Current');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setCurrentLocation(data);
        } catch (error) {
            console.error('Failed to fetch location:', error);
        }
    }

    /***************************** Get Live User Location *****************************/ 
    function GetUserLocation() {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

     navigator.geolocation.getCurrentPosition(
        (position) => {
            const highPrecisionLocation = {
                x: parseFloat(position.coords.latitude.toFixed(6)),  // Increased decimal precision
                y: parseFloat(position.coords.longitude.toFixed(6))  // Increased decimal precision
            };

            setUserLocation(highPrecisionLocation);
            setTriggerFocus(prev => prev + 1);
            },
            (error) => {
                console.error("Error getting location:", error);
                alert("Unable to retrieve your location.");
            },
            {
                enableHighAccuracy: true, // Requests high accuracy
                timeout: 10000,           // 10 seconds timeout
                maximumAge: 0             // Forces fresh location data
            }
        );
    }

    /***************************** Get Markers *****************************/
    async function GetMarkers() {
        try {
            const response = await fetch('location/Markers');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setMarkers(data);
        } catch (error) {
            console.error('Failed to fetch markers:', error);
        }
    }
}

export default Map;
