import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
 
const Formulario = ({cliente}) => {

    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(20, 'El nombre es muy largo')
                    .required('El nombre del cliente es Obligatorio'),

        empresa: Yup.string()
                    .min(5, 'El nombre es muy corto')
                    .max(40, 'El nombre es muy largo')
                    .required('El nombre de la empresa es Obligatorio'),

        email: Yup.string()
                    .email("Email no válido")
                    .required("El email es obligatorio"),

        telefono: Yup.number()
                    .integer("Numero no valido")
                    .positive("Numero no valido")
                    .typeError("El número no es valido"),
        
        notas: Yup.string(),
        
    })

    const handleSubmit = async (values) =>{
        try {
            let respuesta;
            if(cliente.id){
                const url = `http://localhost:4000/clientes/${cliente.id}`;
                    respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }else{
                const url = 'http://localhost:4000/clientes';
                    respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            await respuesta.json();
            navigate('/clientes');
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <>

        <div className='bg-whte mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
                {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
            </h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? "",
                }}

                enableReinitialize={true} // muestra en el input

                onSubmit={ async (values, {resetForm}) =>{
                    await handleSubmit(values);
                    resetForm();
                }}

                validationSchema={nuevoClienteSchema}
                
                >

                {({errors, touched}) => {
                    return ( 
                <Form className='mt-10'>
                    <div className='mb-4'>
                        <label  className='text-gray-800'
                        htmlFor="nombre">Nombre: </label>
                        <Field
                            id="nombre"
                            name="nombre"
                            type="text"
                            className="mt-2 block w-full p-2 bg-gray-50"
                            placeholder="Nombre del cliente"
                        />
                    </div>
                    {errors.nombre && touched.nombre ? (
                        <div className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase'>
                            {errors.nombre}
                        </div>
                    ): null}

                    <div className='mb-4'>
                        <label  className='text-gray-800'
                        htmlFor="empresa">Empresa: </label>
                        <Field
                            name="empresa"
                            type="text"
                            className="mt-2 block w-full p-2 bg-gray-50"
                            placeholder="Empresa del cliente"
                        />
                    </div>
                    {errors.empresa && touched.empresa ? (
                        <div className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase'>
                            {errors.empresa}
                        </div>
                    ): null}

                    <div className='mb-4'>
                        <label  className='text-gray-800'
                        htmlFor="email">E-mail: </label>
                        <Field
                            name="email"
                            type="email"
                            className="mt-2 block w-full p-2 bg-gray-50"
                            placeholder="Email del cliente"
                        />
                    </div>
                    {errors.email && touched.email ? (
                        <div className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase'>
                            {errors.email}
                        </div>
                    ): null}

                    <div className='mb-4'>
                        <label  className='text-gray-800'
                        htmlFor="telefono">Telefono: </label>
                        <Field
                            name="telefono"
                            type="tel"
                            className="mt-2 block w-full p-2 bg-gray-50"
                            placeholder="Telefono del cliente"
                        />
                    </div>
                    {errors.telefono && touched.telefono ? (
                        <div className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase'>
                            {errors.telefono}
                        </div>
                    ): null}

                    <div className='mb-4'>
                        <label  className='text-gray-800'
                        htmlFor="notas">Notas: </label>
                        <Field
                            name="notas"
                            as="textarea"
                            type="text"
                            className="mt-2 block w-full p-2 bg-gray-50 h-40"
                            placeholder="Notas del cliente"
                        />
                    </div>

                    <input type="submit" className='mt-5 w-full p-3 bg-blue-800 text-white uppercase
                    font-bold text-lg hover:bg-blue-600 hover:cursor-pointer' value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} />
                </Form>
                )}}
            </Formik>
        </div>
    </>
  )
}

Formulario.defaultProps = {
    cliente:{

    }
}

export default Formulario