import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {api} from '../../services'
import { useAuth } from '../../contexts/auth'
import { Pencil, Trash2, List, Map } from 'lucide-react'
import Swal from 'sweetalert2'


export function LocaisPage() {
    const { user } = useAuth()

    const [locais, setLocais] = useState([])

    async function getLocais() {
        const response = await api(`/locais?user_id=${user.id}`)
        const data = await response.json()
        setLocais(data)
    }

    const deletarLocal = (local)=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger me-2"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Esta seguro de deletar esse local?",
            text: local.nome_do_destino,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não, cancelar!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              api(`/locais/${local.id}`, {method:'DELETE'}).then(resp => {
                if (resp.ok){
                    swalWithBootstrapButtons.fire({
                        title: "Deletado!",
                        icon: "success"
                      });
                }
                getLocais()
              })
              
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelado",
                icon: "error"
              });
            }
          });
    }

    useEffect(() => {
        getLocais();
    }, [])


    return (      
<>
    <h2 className="text-center my-5 fw-bold">Locais</h2>

    <div className="d-md-block">
        <Link to='/locais' className="btn btn-success btn-lg me-2 rounded-0" type="button"> <List /></Link> 
        <Link to='/locais-map' className="btn btn-success btn-lg rounded-0" type="button"><Map /></Link>
    </div>                
    <div className="table-responsive mt-2">
        <table className='table'>
            <thead>
                <tr className="table-success">
                <th scope="col" className='col-lg-2'>Nome do local</th>
                <th scope="col" className='col-lg-2'>Localização</th>
                <th scope="col" className='col-lg-7'>Descrição</th>
                <th scope="col">Opções</th> 
                </tr>
            </thead>
            <tbody>
                {locais.map(local => (
                    <tr key={local.id}>
                        <td>{local.nome_do_destino}</td>
                        <td>{local.localidade}</td>
                        <td>{local.descricao}</td>
                        <td>
                            <Link to={`/cadastro-locais/${local.id}`} className='btn-primary me-2'><Pencil size={18} /></Link>
                            <button className='text-danger btn' onClick={()=>deletarLocal(local)}><Trash2 size={18} /></button>
                        </td>
                    </tr>
                ))}
            </tbody>                                
        </table>                                                     
    </div>
    <div className="d-grid gap-2">
        <Link to='/cadastro-locais' className="btn btn-success btn-lg rounded-0" type="button">Adicionar local</Link>                    
    </div>                
</>               
)
}