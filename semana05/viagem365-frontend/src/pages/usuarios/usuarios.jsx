import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {api} from '../../services'

export function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([])

    async function getUsers() {
        const response = await api('/users')
        const data = await response.json()
        setUsuarios(data)
    }

    useEffect(() => {
        getUsers();
    }, [])


    return (
    <>
    <h2 className="text-center my-5 fw-bold">Usuarios</h2>
                    
    <div className="table-responsive">
        <table className='table'>
            <thead>
                <tr className="table-success">
                <th scope="col">ID</th>
                <th scope="col">Usuário</th>
                <th scope="col">Sexo</th>
                <th scope="col">CPF</th>
                <th scope="col">Data de nascimento</th>
                <th scope="col">CEP</th>
                <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map(user => (
                    <tr key={user.id}>
                        <th>{user.id}</th>
                        <td>{user.nome}</td>
                        <td>{user.sexo}</td>
                        <td>{user.cpf}</td>
                        <td>{user.data_nascimento}</td>
                        <td>{user.endereco?.cep}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
                
            </tbody>                                
        </table>                                                     
    </div>
    <div className="d-grid gap-2">
        <Link to='/atualizar-usuarios' className="btn btn-success btn-lg rounded-0 mt-5" type="button">Atualize seus dados</Link>                    
    </div>                
    </>
    )
}