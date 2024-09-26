import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useAuth } from '../../contexts/auth'
import Swal from 'sweetalert2'

export function LoginPage() {
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
      })
    const onSubmit = async (data) => {
        try {
            const is_login = await signIn(data)
            if (is_login) navigate('/dashboard')
            else Swal.fire({
                    icon: "error",
                    title: "Email ou senha inválidas"});    
        } catch (error) {
            alert(error)
        }
    }

    return (
        <main className="container-fluid">
            <div className="row">
                <div className="col-lg-7 min-vh-100 bg-primary px-0">                   
                    <img src="https://agorarn.com.br/files/uploads/2020/01/viagem.jpg" className='object-fit-cover w-100 h-100'/>
                </div>
                <div className="col-lg-5 min-vh-100 d-flex">
                    <div className="w-100 px-3 px-lg-5 ">
                        <h1 className="text-center my-5 fw-bold pb-5">Viagem 365</h1>
                        <h2 className="text-center my-5">Faça seu login</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" 
                                    placeholder="name@example.com"
                                    {...register("email", {
                                        required: "Digite seu email.",
                                    })}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Senha</label>
                                <input type="password" className="form-control"
                                    placeholder="SuaSenha"
                                    {...register("senha", {
                                        required: "Digite seu email.",
                                    })}/>
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-success btn-lg rounded-0" type="submit">Enviar</button>
                                <Link to='/cadastro' className="btn btn-primary btn-lg rounded-0" type="button">Cadastre-se</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}