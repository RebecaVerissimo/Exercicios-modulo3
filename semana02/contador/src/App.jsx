import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `Contador: ${count}`;
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };

  // Função para decrementar o contador
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <>
     <div className='contador'>
      <h1>Contador: {count}</h1>
      <button onClick={decrement}>Decrementar</button>
      <button onClick={increment} style={{ marginLeft: '10px' }}>Incrementar</button>
    </div>
      
    </>
  )
}

export default App
