function ListaTarefas(props) {
    return (
        <ul>
        {props.tarefas.length > 0 && 
        (          
          props.tarefas.map(tarefas => 
          (
            <li key={tarefas.id}>{tarefas.descricao}</li>
          ))          
        ) || (
          <span>Sem tarefas adicionadas</span>
        )}
      </ul>
    );
}

export default ListaTarefas