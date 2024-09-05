import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TemaProvider } from './contexts/TemaContext.jsx';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TemaProvider>
      <App />
    </TemaProvider>
  </StrictMode>,
)
