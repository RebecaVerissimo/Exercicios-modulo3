import {useState, useEffect} from 'react'
import {api} from '../../services'
import { useAuth } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import { Card } from '../../components/card'

export function DashboardPage() {
    const { user } = useAuth()
    const [locais, setLocais] = useState([])
    const [users, setUsers] = useState([])

    async function searchLocais() {
        const response = await api(`/locais?user_id=${user.id}`)
        const data = await response.json()
        setLocais(data)
    }
    
    async function searchUsers() {
        const response = await api(`/users`)
        const data = await response.json()
        setUsers(data)
    }

    useEffect(()=> {
        searchLocais()
        searchUsers()
    }, [])

    return (
    <>
        <h2 className="mb-5 mt-5 fw-bold">Dashboard</h2>
        <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
                <Card title={'Usuarios'} total={users.length} icon={'Users'}/>                                              
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
                <Card title={'Locais'} total={locais.length} icon={'MapPinned'}/>                                                   
            </div>
        </div>
        <h2 className="mt-5 fw-bold">Locais</h2>
        <span>Listagem das localidades registradas</span>                
        <div className="table-responsive mt-5">
            <table className='table'>
                <thead>
                    <tr>
                    <th scope="col" className='col-3'>Nome do local</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Endereço</th>
                    </tr>
                </thead>
                <tbody>
                {locais.map(locai => (
                    <tr key={locai.id}>
                        <td>{locai.nome_do_destino}</td>
                        <td>{locai.descricao}</td>
                        <td>{locai.endereco}</td>
                    </tr>
                ))}
                </tbody>                                
            </table>                                                     
        </div>
        <div className="d-grid gap-2">
            <Link to='/locais' className="btn btn-success btn-lg rounded-0" type="button">Administrar locais</Link>                    
        </div>         
    </>
    )
}