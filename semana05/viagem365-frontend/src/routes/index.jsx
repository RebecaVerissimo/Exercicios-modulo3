import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/login/login";
import { CadastroPage } from "../pages/cadastro/cadastro";
import { DashboardPage } from "../pages/dashboard/dasboard";
import { TemplatePrivateRoute } from "../templates/private-route";
import { LocaisPage } from "../pages/locais/locais";
import { CadastroLocaisPage } from '../pages/cadastro-locais/cadastro-locais'
import { LocaisMapPage } from '../pages/locais/locais-mapa'
import { UsuariosPage } from '../pages/usuarios/usuarios'
import { AtualizarUsuarioPage } from '../pages/usuarios/atualizar-usuario'




export function AppRoutes() {
    return (
        <Routes>
            {/* MINHAS ROTAS PUBLICAS */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            {/* MINHAS ROTAS PRIVADAS */}
            <Route path="/" element={<TemplatePrivateRoute/>}>
                <Route path="/dashboard" element={<DashboardPage />}/>
                <Route path="/locais" element={<LocaisPage />}/>
                <Route path="/locais-map" element={<LocaisMapPage />}/>
                <Route path="/cadastro-locais/:id?" element={<CadastroLocaisPage />}/>
                <Route path="/usuarios" element={<UsuariosPage />}/>
                <Route path="/atualizar-usuarios" element={<AtualizarUsuarioPage />}/>
            </Route>
        </Routes>
    )
} 