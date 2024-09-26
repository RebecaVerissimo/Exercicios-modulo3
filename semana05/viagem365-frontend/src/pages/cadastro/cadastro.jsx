import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import { api } from "../../services"
import Swal from 'sweetalert2'
import {useState} from 'react'

export function CadastroPage() {
    const navigate = useNavigate()
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        shouldUseNativeValidation: true,
    })

    const [disabled, setDisabled] = useState(true)
    const [endereco, setEndereco] = useState({})

    const obtenerEndereco = async(e) => {
        const cep = e.target.value
        if(cep.length >= 8 && cep.length <= 9){
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                if(response.ok){
                    const data = await response.json()
                    if (!data.hasOwnProperty('erro')){
                        setEndereco(data)
                        setDisabled(null)
                        return    
                    }
                }
            }catch(err){
                console.error(err)
            }
        }
        setEndereco({})
        setDisabled(true)
    }

    const evitarDuplicado = async ({email, cpf}) => {
        const response = await api(`/users?email=${email}`)
        const response2 = await api(`/users?cpf=${cpf}`)
        const data = await response.json()
        const data2 = await response2.json()
        if (data.length > 0 || data2.length > 0){
            return true            
        }
        return false
    }
    
    const onSubmit = async (data) => {
        const payload = {...data, endereco}
        delete payload.cep
        try {
            if (await evitarDuplicado(data)) {
                Swal.fire({
                    icon: "error",
                    title: "Não foi possivel cadastrar o usuario",
                    text: "Usuario existente, faça login."
                });
                return 
            }
            let resposta = await api('/users', {
                method: 'POST',
                body: JSON.stringify(payload)
            })
            if (resposta.status == 201) {
                let userData = await resposta.json();
                console.log(userData);
                Swal.fire({
                    icon: "success",
                    title: "Usuario cadastrao con exito",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset()
                setEndereco({})
                setDisabled(true)
                navigate('/')
                return true;
            } else {
                let error = await resposta.json();
                // console.log(error)
                throw new Error(error)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Não foi possivel cadastrar o usuario",
                text: error
            });
        }
        return false;
      }

    return (
        <main className="container-fluid">
            <div className="row">
                <div className="col-lg-7 min-vh-100 d-flex align-items-center">
                    <div className="w-100 px-3 px-lg-5 ">
                        <h2 className="text-center mb-5">Cadastre-se</h2>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="row">
                            <div className="mb-3 col-lg-6">
                                <label className="form-label">Nome Completo</label>
                                <input type="text" className="form-control" placeholder="Seunome e Sobrenome" 
                                {...register("nome", {
                                    required: "Digite seu nome completo.",
                                })} aria-invalid={errors.nome ? "true" : "false"}/>
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="form-label">Sexo</label>
                                <select className="form-select" 
                                {...register("sexo", {
                                    required: "Seleccione um sexo.",
                                })}>
                                    <option value="feminino">Feminino</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="outro">Outro</option>
                                </select>
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="form-label">Data de nascimento</label>
                                <input type="date" className="form-control" 
                                {...register("data_nascimento", {
                                    required: "Digite sua data de nascimento.",
                                })}/>
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="form-label">CPF</label>
                                <input type="text" className="form-control" placeholder="123.456-78" 
                                {...register("cpf", {
                                    required: "Digite seu CPF.",
                                })} aria-invalid={errors.cpf ? "true" : "false"}/>
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" placeholder="seuemail@example.com" 
                                {...register("email", {
                                    required: "Digite seu email.",
                                })} aria-invalid={errors.mail ? "true" : "false"}/>
                            </div>
                            <div className="mb-3 col-lg-6">
                                <label className="form-label">Senha</label>
                                <input type="password" className="form-control" placeholder="**********" 
                                {...register("senha", {
                                    required: "Digite sua senha.",
                                })}/>
                            </div>                            
                            <div className="mb-3">
                                <label className="form-label">Endereço (CEP)</label>
                                <input type="text" className="form-control" placeholder="Digite seu CEP" 
                                {...register("cep", {
                                    required: "Digite seu endereço.",
                                    maxLength: 9,
                                })}
                                onChange={obtenerEndereco}
                                />
                                <small className="text-muted">Endereço: {JSON.stringify(endereco)}</small>
                            </div> 
                            <div className="d-grid gap-2 mb-3">
                                <button className="btn btn-success btn-lg rounded-0" type="submit" disabled={disabled}>Cadastrar</button>                            
                            </div>                           
                        </form>
                        <Link to='/'>Já possui conta? faça seu login.</Link>                                                
                    </div>
                </div>
                <div className="col-lg-5 min-vh-100 bg-primary px-0">
                    <img src="https://cdn.blablacar.com/wp-content/uploads/br/2024/05/05094506/como-planejar-uma-viagem.webp" className='object-fit-cover w-100 h-100'/>
                </div>
            </div>
        </main>
    )
}