import 'leaflet/dist/leaflet.css'
import './locais.css'
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {api} from '../../services'
import { useAuth } from '../../contexts/auth'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { List, Map } from 'lucide-react'

export function LocaisMapPage() {
    const { user } = useAuth()

    const [locais, setLocais] = useState([])

    async function getLocais() {
        const response = await api(`/locais?user_id=${user.id}`)
        const data = await response.json()
        setLocais(data)
    }

    useEffect(() => {
        getLocais();
    }, [])


    const position = [-27.595358846080565, -48.52669428114667]
    let zoom = 11
    return (        
        <>
            <h2 className="text-center my-5 fw-bold">Locais</h2>

            <div className="d-md-block mb-2">
                <Link to='/locais' className="btn btn-success btn-lg me-2 rounded-0" type="button"> <List /></Link> 
                <Link to='/locais-map' className="btn btn-success btn-lg rounded-0" type="button"><Map /></Link>
            </div> 
            <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} className='w-100 h-map'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    locais.length > 0 && locais.map(local => 
                        <Marker position={[local?.coordenadas?.lat, local?.coordenadas?.lon]} key={local.id}>
                            <Popup>
                                {local.nome_do_destino}. <br /> 
                                {local.endereco}
                            </Popup>
                        </Marker>
                    )
                }
                
            </MapContainer>
        </>

    )
}