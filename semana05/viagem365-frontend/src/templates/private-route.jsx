import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth'
import { Sidebar } from '../components/sidebar'

export function TemplatePrivateRoute() {
    const { user } = useAuth()

    return user ? (
        <div className="container-flex">
            <div className="row">
                <div className="col-lg-3">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-lg-9">
                    <div className="w-100 px-3 px-lg-5">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    ) : <Navigate to="/" />
}