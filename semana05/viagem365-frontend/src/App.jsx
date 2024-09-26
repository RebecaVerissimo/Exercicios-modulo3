import { useState } from 'react'
import './App.css'
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import { AuthProvider } from "./contexts/auth"



function App() {
  

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
