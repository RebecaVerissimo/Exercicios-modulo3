import { useTema } from './contexts/TemaContext';
import './App.css'

function App() {
  const { tema, trocarTema } = useTema();

  return (
    <div className={tema === 'light' ? 'temaClaro' : 'temaEscuro'}>
      <div>
        <p>O tema atual é: {tema}</p>
        <button onClick={trocarTema}>Alternar Tema</button>
      </div>      
    </div>
  )
}

export default App
