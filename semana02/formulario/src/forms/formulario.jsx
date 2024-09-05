import { useForm } from 'react-hook-form';
import { useState } from 'react';
import './formulario.css'


const Formulario = () => {
    const {register, reset, handleSubmit, formState: {errors}} = useForm();

    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = (data) => {
        console.log(data)
        setIsSubmitted(true)
        reset()
    };

    return (
        <>
        <h2>Registrar</h2>

        <form onSubmit = {handleSubmit(onSubmit)} className='formulario'>
            <div>
                <label htmlFor="name">Nome</label>
                <input className='form'
                type='text' 
                id='name' 
                {...register('name', {required: "Nome e obligatório"})}></input>
                {errors.name && <p> {errors.name.message} </p>}
            </div> 
             <div>
                <label htmlFor="namr">E-mail</label>
                <input className='form'
                type='email' 
                id='email' 
                {...register('email', {required: "E-mail e obligatório"})}></input>
                {errors.email && <p> {errors.email.message} </p>}
            </div>
            <div>
                <label htmlFor="password">Senha</label>
                <input className='form'
                type='password' 
                d='password' 
                {...register('password', {required: "Senha e obligatório"})}></input>
                {errors.password && <p> {errors.password.message} </p>}
            </div>
            <button className='btn_submit' type='submit'>Registrar</button>
        </form>

        {isSubmitted && <p>Registro realizado com sucesso!</p>}        
        </>
    )
}

export default Formulario