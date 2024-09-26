import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/auth'
import { LogOut, Users, MapPinned, LayoutDashboard, Plane } from 'lucide-react'


export function Sidebar() {
    const { signOut, user } = useAuth()
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark min-vh-100 h-100">
                <Link to="/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4">Viagem 365 <Plane className='ms-2' /></span>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to='/dashboard' className="nav-link text-white" ><LayoutDashboard className='me-2' />Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/locais' className="nav-link text-white" ><MapPinned className='me-2' />Locais</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/usuarios' className="nav-link text-white" ><Users className='me-2' />Usuarios</Link>
                    </li>
                </ul>
                <hr />
                <span className="navbar-text">{user.nome}</span>
                <div className="nav-item">
                    <Link className="d-flex align-items-center text-white text-decoration-none" onClick={signOut}>
                        <LogOut />
                        <strong className='ms-2'>Sair</strong>
                    </Link>
                </div>
            </div>

        </>
    )
}