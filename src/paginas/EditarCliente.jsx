import Formulario from '../components/Formulario'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';

const EditarCliente = () => {
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

      {cliente?.nombre ? (
        <>
        <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-3'>Utiliza el Formulario para editar datos del cliente</p>
         <Formulario 
         cliente={cliente}
        />
        </> 
      ): (
        <h1 className='font-black text-4xl text-blue-900'>El cliente no existe</h1>
      )}
    </>
  )
}

export default EditarCliente