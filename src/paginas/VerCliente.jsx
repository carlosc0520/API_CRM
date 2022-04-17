import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

const VerCliente = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(false);
    useEffect(() => {
        setCargando(!cargando);
        const obtenerClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
                const respuesta = await fetch(url)
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }
            setCargando(false);
        }
        obtenerClienteAPI();
    }, []);

    return (
        <>
        {Object.keys(cliente).length === 0 ? (
            <h1 className='h1 font-bold text-red-600 text-4xl'>Cliente no existente</h1>
        ):(
        <>
            {cargando ? 'cargando...' : (
            <>
                {cliente ? (
                    <div>
                        <h1 className='h1 text-3xl font-bold mb-3 text-slate-500'>Información del cliente</h1>
                        <p className='text-2xl text-gray-700 '>
                            <span className='uppercase font-bold'>
                                Cliente:
                            </span>
                            {" " + cliente.nombre}
                        </p>

                        <p className='text-2xl text-gray-700 '>
                            <span className='uppercase font-bold'>
                                Email:
                            </span>
                            {" " + cliente.email}
                        </p>

                        <p className='text-2xl text-gray-700 '>
                            <span className='uppercase font-bold'>
                                Empresa:
                            </span>
                            {" " + cliente.empresa}
                        </p>

                        {cliente.notas ? (
                            <p className='text-2xl text-gray-700 '>
                            <span className='uppercase font-bold'>
                                Notas:
                            </span>
                            {" " + cliente.notas}
                            </p>
                        ): null}
                    </div>
                ): null} 
            </>
            )}
        </>
        )}
        </>
    )
}

export default VerCliente