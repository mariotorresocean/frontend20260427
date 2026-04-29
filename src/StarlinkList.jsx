import { useEffect, useState, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './starlink.css'

export default function StarlinkList() {
    const [pagina, setPagina] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const inicializacao = useRef(true);
    const [starlinks, setStarlinks] = useState([]);
    const [total,setTotal] = useState(0);
    const satIcon = L.divIcon({
        html: '<div style="font-size:22px; line-height:1; filter: drop-shadow(0 0 6px #60a5fa);">🛰️</div>',
        className: '',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });

    function fetchStarlinks(pageNumber, acumular) {
        fetch('https://api.spacexdata.com/v4/starlink/query', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "query": {},
                "options": { page: pageNumber, limit: 200 }
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if (acumular) {
                const atuais = starlinks;
                setStarlinks([...atuais, ...data.docs])
            } else {
                setStarlinks(data.docs)
                setTotal(data.totalDocs);
            }
            setHasNextPage(data.hasNextPage)
        })
        .catch((error) => console.error('Deu bug:', error))
    }

    function carregarProximaPagina() {
        if (hasNextPage) {
            setPagina(pagina + 1);
            console.log('Vou carregar '+pagina);
            fetchStarlinks(pagina,false);
        }
    }
    function carregarPaginaAnterior() {
        if (pagina > 1) {
            setPagina(pagina - 1);
            console.log('Vou carregar '+pagina);
            fetchStarlinks(pagina,false);
        }
    }
    function carregarMais() {
        if (hasNextPage) {
            setPagina(pagina + 1);
            fetchStarlinks(pagina, true);
        }
    }
 
    useEffect(() => {
        if (inicializacao.current) {
            fetchStarlinks(pagina,false);
            inicializacao.current = false;
        }
    }, [])
    const position = [-3.0925454075226755, -60.01846372698568];
    const comPosicao = starlinks.filter(
        (sat) => sat.latitude !== null && sat.longitude !== null
    );
    return (
        <div className="starlink-app">
        <div className="starlink-header">
            <h1>
            <span>🛰️</span>
            <span className="gradient-text">Satélites da Starlink</span>
            </h1>
            <div className="stats">
            <div className="stat">
                <span className="stat-label">Carregados</span>
                <span className="stat-value">{starlinks.length}</span>
            </div>
            <div className="stat">
                <span className="stat-label">Total</span>
                <span className="stat-value">{total}</span>
            </div>
            <div className="stat">
                <span className="stat-label">Com posição</span>
                <span className="stat-value">{comPosicao.length}</span>
            </div>
            </div>
        </div>

        <div className="map-wrapper">
            <MapContainer center={[20, 0]} zoom={2} minZoom={2}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png" />
            {comPosicao.map((sat) => (
                <Marker key={sat.id} position={[sat.latitude, sat.longitude]} icon={satIcon}>
                <Popup>{/* mesmo conteúdo de antes */}</Popup>
                </Marker>
            ))}
            </MapContainer>
        </div>

        <div className="footer">
            {hasNextPage && (
            <button className="load-more-btn" onClick={carregarMais}>⬇ Carregar mais</button>
            )}
            <p className="counter">
            <strong>{starlinks.length}</strong> satélites carregados de um total de <strong>{total}</strong>
            </p>
        </div>
        </div>
        );
}

