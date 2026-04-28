import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default function StarlinkList() {
    const [starlinks, setStarlinks] = useState([]);
    const satIcon = L.divIcon({
        html: '<div style="font-size:18px; line-height:1;">🛰️</div>',
        className: '',
        iconSize: [24,24],
        iconAnchor:[12,12]
    })

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
                <Marker position={[s.latitude, s.longitude]} icon={satIcon}>
                    <Popup>
                        <h1>{s.spaceTrack.OBJECT_NAME}</h1>
                        <p>{s.spaceTrack.OBJECT_ID}</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    </>
}

