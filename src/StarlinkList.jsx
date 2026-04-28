import { useEffect, useState } from "react"

export default function StarlinkList() {
    const [starlinks, setStarlinks] = useState([]);
    useEffect(() => {
        fetch('https://api.spacexdata.com/v4/starlink/query', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "query": {},
                "options": { limit: 20 }
            })
        })
        .then((response) => response.json())
        .then((data) => setStarlinks(data.docs))
        .catch((error) => console.error('Deu bug:', error))
        
    }, [])

    return <>
        <h1>Lista de satelites</h1>
        <ul>
            {starlinks.map((s) => (
                <li>{s.spaceTrack.OBJECT_NAME}</li>
            ))}
            {console.log(starlinks)}
        </ul>
    </>
}

