import 'leaflet/dist/leaflet.css'

import { useState, useEffect, useMemo } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom'

import { useAuth } from '../../contexts/auth'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { api, getCepCoordinates, getAddress } from '../../services'
import Swal from 'sweetalert2'

export function CadastroLocaisPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    let zoom = 15
    const { user } = useAuth()

    const { register, handleSubmit, reset, getValues } = useForm({
        shouldUseNativeValidation: true,
    })

    const [position, setPosition] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [endereco, setEndereco] = useState(null)

    const eventHandlers = useMemo(
        () => ({
            async dragend(e) {
                const {lat, lng} = e.target.getLatLng()
                setPosition([lat, lng])
                const address = await getAddress(lat, lng)
                setEndereco(address)
            },
        }),
        [],
    )


    const generatePayload = (data) => {
        const [lat, lon] = position
        return {
            ...data,
            endereco: endereco,
            coordenadas: {
                lat,
                lon
            },
            user_id: user.id
        }
    }

    const onSubmit = async (data) => {
        const payload = generatePayload(data)
        // console.log(payload)
        try {
            const url = id ? `/locais/${id}`: '/locais';
            const metodo = id ? 'PUT' : 'POST';
            const mensagem = id ? 'Local atualizado com sucesso' : 'Local cadastrado con sucesso'
            let resposta = await api(url, {
                method: metodo,
                body: JSON.stringify(payload)
            })
            if (resposta.ok) {
                Swal.fire({
                    icon: "success",
                    title: mensagem,
                    showConfirmButton: false,
                    timer: 1500
                });
                reset()
                setDisabled(true)
                navigate('/locais')
                return true;
            } else {
                let error = await resposta.json();
                // console.log(error)
                throw new Error(error)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Não foi possivel salvar o local",
                text: error
            });
        }
    }

    const getEndereco = async (e) => {
        const value = e.target.value 
        if (value.length == 8 || value.length == 9) {
            try {
                const response = await getCepCoordinates(value)
                if (response) {
                    // console.log('getEndereco', response)
                    setEndereco(response?.display_name)
                    setPosition([response?.lat, response?.lon])
                    setDisabled(null)
                    return
                }
            } catch (error){setEndereco(null)}
        }
        setEndereco(null)
        setPosition(null)
        setDisabled(true)
    }

    async function getLocal(){
        const response = await api(`/locais/${id}`)
        if (response.ok){
            const data = await response.json()
            reset(data)
            setEndereco(data.endereco)
            setPosition([data.coordenadas.lat, data.coordenadas.lon])
            setDisabled(null)
        }
    }

    useEffect(()=>{
        if (id){
            getLocal()
        }
    }, [id])


    return (
        <>
            <h2 className="text-center my-5">
                {id ? 'Editar localidade': 'Cadastro de localidade'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="row">
                <div className="mb-3 col-lg-6">
                    <label className="form-label">Nome do local</label>
                    <input type="text" className="form-control" placeholder="Praia, parque, museo..."
                        {...register("nome_do_destino", {
                            required: "Digite o nome do local.",
                        })} />
                </div>
                <div className="mb-3 col-lg-6">
                    <label className="form-label">Localidade</label>
                    <input type="text" className="form-control" placeholder="localidade"
                        {...register("localidade", {
                            required: "Digite seu CEP",
                        })} />
                </div>
                <div className="mb-3 col-lg-6">
                    <label className="form-label">CEP</label>
                    <input type="text" className="form-control" placeholder="CEP"
                        {...register("cep", {
                            required: "Digite seu CEP.",
                        })}
                        onChange={getEndereco}
                    />
                </div>
                {endereco && position &&
                    <div className="mb-3 col-12">Endereço:
                        <p className="text-muted">{endereco}</p>
                        Coordenadas:
                        <p className="text-muted">lat: {position[0]}, lon: {position[1]}</p>
                    </div>}
                <div className="mb-3">
                    <label className="form-label">Descrição do local</label>
                    <textarea className="form-control" rows={4} placeholder="Faça uma breve descrição do local"
                        {...register("descricao", {
                            required: "Digite uma descrição do local",
                        })} />
                </div>

                {position &&
                    <div className="col-12 my-3">
                        <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} className='w-100 h-map-min'>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker draggable={true} position={position} eventHandlers={eventHandlers}>
                            </Marker>
                        </MapContainer>
                    </div>}

                <div className="d-grid gap-2">
                    <button className="btn btn-success btn-lg rounded-0" type="submit" disabled={disabled}>
                    {id ? 'Salvar alterações': 'Cadastrar'}
                    </button>
                </div>
            </form>
        </>
    )
}