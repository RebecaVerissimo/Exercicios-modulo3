import { Users, MapPinned } from 'lucide-react'


export function Card(props) {
    return (
        <>
            <div className="card text-bg-dark shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                {props.title}</div>
                            <div className="h2 mb-0 font-weight-bold text-gray-800">{props.total}</div>
                        </div>
                        <div className="col-auto">
                            {props.icon == 'Users' && <Users size={36}/>}
                            {props.icon == 'MapPinned' && <MapPinned size={36}/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}