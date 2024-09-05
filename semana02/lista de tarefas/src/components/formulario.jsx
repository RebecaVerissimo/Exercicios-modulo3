import { useState } from "react";

function Formulario({submit}) {
    const [descricao, setDescricao] = useState('');
    const [concluido, setConcluido] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        const tarefa = {descricao, concluido};
        submit(tarefa)
    }
 
    return (
        <>
        <h2>Cadastro de uma nova tarefa</h2>
        <p>Preencha o campo abaixo para cadastrar uma nova tarefa</p>
        <form id="form-tarefa" onSubmit={onSubmit}>
            <fieldset>
                <label htmlFor="descricao">Digite a descriçãp da tarefa</label>
                <input type="text" id="descricao" onChange={e => setDescricao(e.target.value)} value={descricao}/>
            </fieldset>
            <fieldset>
                <label>Tarefa concluida
                <input type="checkbox" id="concluido" onChange={e => setConcluido(e.target.value)} checked={concluido}></input>
                </label>                
            </fieldset>
            <button>Cadastrar</button>
        </form>
        </>
    )
}

export default Formulario;