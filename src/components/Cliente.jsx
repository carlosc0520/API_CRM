import { useNavigate } from 'react-router-dom'

const Cliente = ({cliente,handleEliminar}) => {
    const {nombre, id, empresa, email, telefono} = cliente;

    const navigate = useNavigate();
  return (
    <tr className='text-center border hover:bg-gray-100'>
        <td className='p-3'>{nombre}</td>
        <td className='p-3 text-left'>
            <p><span className='text-gray-800 upppercase font-bold'>Email: </span>{email}</p>
            <p><span className='text-gray-800 upppercase font-bold'>Tel: </span>{telefono}</p>
        </td>
        <td className='p-3 text-left'>{empresa}</td>
        <td className='p-3 text-white'>
            <button type="button" 
                    onClick={() => navigate(`/clientes/${id}`)}
                    className='mt-3 w-full p-1 rounded-md bg-green-600 hover:bg-green-700 hover:cursor-pointer'>Ver</button>
            <button type="button" className='mt-3 w-full p-1 rounded-md bg-blue-600 hover:bg-blue-700 hover:cursor-pointer'
                    onClick={() => navigate(`/clientes/editar/${id}`)}
                    >Editar</button>
            <button type="button" 
                  onClick={() => handleEliminar(id)}
            className='mt-3 w-full p-1 rounded-md bg-red-600 hover:bg-red-700 hover:cursor-pointer'>Eliminar</button>
        </td>
    </tr>
  )
}

export default Cliente