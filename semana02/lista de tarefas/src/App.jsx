import { useState } from "react";
import ListaTarefas from "./components/listaTarefas";
import Formulario from "./components/formulario";

function App() {

  const [tarefas, setTarefas] = useState([])

  const handleSubmit = (data) => {
    setTarefas([...tarefas, data])
  }
  return (
    <>
      <h1>Lista de Tarefas</h1>
      <ListaTarefas tarefas = {tarefas}></ListaTarefas>
      <Formulario submit={handleSubmit}></Formulario>
    </>
  )
}

export default App
