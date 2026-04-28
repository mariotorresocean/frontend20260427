import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'

export default function StarlinkList() {
    const [starlinks, setStarlinks] = useState([]);
    useEffect(() => {
        fetch('https://api.spacexdata.com/v4/starlink/query', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "query": {},
                "options": { limit: 100 }
            })
        })
        .then((response) => response.json())
        .then((data) => setStarlinks(data.docs))
        .catch((error) => console.error('Deu bug:', error))
        
    }, [])
    const position = [-3.0925454075226755, -60.01846372698568]
    return <>
        <h1>Lista de satelites</h1>
        <MapContainer center={position} zoom={1} style={{height: '60vh', width:'100%'}}>
            <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {starlinks
                .filter((s) => s.latitude != null)
                .map((s) => (
                <Marker position={[s.latitude, s.longitude]}>
                    <Popup content={s.spaceTrack.OBJECT_NAME}/>
                </Marker>
            ))}
        </MapContainer>
    </>
}

