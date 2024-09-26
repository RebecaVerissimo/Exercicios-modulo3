import { createContext, useContext, useState } from "react";
import { api } from "../services"

export const AuthContext = createContext({
    user: null, // pode ser null ou {}
    signIn: async () => { }, // função entrar na aplicação
    signOut: () => { }, // função para "remover" o estado do usuario da aplicar 
    setUser: () => { }
})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const userLoggedStorage = localStorage.getItem('@lab365:userLogged')
        if (userLoggedStorage) {
            return JSON.parse(userLoggedStorage)
        }
        return null
    })

    async function signIn({email, senha}) {
        const response = await api(`/users?email=${email}&senha=${senha}`)
        const data = await response.json()
        if (data.length > 0){
            const usuario = data[0]
            if (usuario.senha == senha) {
                setUser(usuario)
            localStorage.setItem('@lab365:userLogged', JSON.stringify(usuario))
            return true
            }
            
        }
        return false
    }

    function signOut() {
        setUser(null)
        localStorage.removeItem('@lab365:userLogged')
    }

    return <AuthContext.Provider value={{ user, signIn, signOut, setUser }}>{children}</AuthContext.Provider>
}
// custom hook
export function useAuth() {
    const contexto = useContext(AuthContext)

    return contexto
}