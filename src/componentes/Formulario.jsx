import React from 'react'
import { Formik, Form, Field,} from 'formik'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'

const Formulario = ({paciente}) => {

  const navigate = useNavigate()

  const nuevoPacienteSchema = Yup.object().shape({
    nombre:Yup.string()
    .min(3,'El nombre es muy corto')
    .max(25,'El nombre es muy largo')
    .required('nombre del paciente es obligatorio'),
    email:Yup.string()
    .required('email es obligatorio')
    .email('email no valido'),
    telefono:Yup.number('')
    .integer('numero no valido')
    .positive('numero no valido')
    .typeError('numero no valido'),
    edad:Yup.number().required().positive().integer(),
    peso:Yup.number().required().positive().integer(),
  })


  const handleSubmit = async (valores) => {
    try {
      const url = 'http://localhost:4000/pacientes'

     const respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(valores),
        headers: {
          'Content-type': 'application/json'
        }
      })

      const resultado = await respuesta.json()
      console.log(resultado)

      navigate('/pacientes')
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
    <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
      {paciente?.nombre ? 'Editar Paciente' : 'Agregar Paciente' }</h1>
      
    <Formik
      initialValues={{
        nombre:paciente?.nombre ?? "",
        email: paciente?.email ?? "",
        telefono:paciente?.telefono ?? "",
        edad:paciente?.edad ?? "",
        peso:paciente?.peso ?? "",
        notas:paciente?.notas ?? "",
      }}
      enableReinitialize={true}
      onSubmit={ async (values, {resetForm}) => {
        await handleSubmit(values)

        resetForm()
      }}
      validationSchema={nuevoPacienteSchema}
    >
      {({errors, touched})=> {
        return (
        <Form className="mt-10">
        <div className="mb-4">
          <label 
          className="text-gray-800"
          htmlFor="nombre"
          >Nombre:</label>
        <Field
          id="nombre" 
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Nombre del Paciente"
          name="nombre"
          />
          
          {errors.nombre && touched.nombre ? (
            <Alerta>{errors.nombre}</Alerta>
          ) : null }
        </div>

        <div className="mb-4">
        <label 
          className="text-gray-800"
          htmlFor="email"
          >E-mail:</label>
        <Field
          id="email" 
          type="email"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Email del Paciente"
          name="email"
          />
          {errors.email && touched.email ? (
            <Alerta>{errors.email}</Alerta>
          ) : null }
          </div>

          <div className="mb-4">
        <label 
          className="text-gray-800"
          htmlFor="telefono"
          >Telefono</label>
        <Field
          id="telefono" 
          type="tel"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Telefono del Paciente"
          name="telefono"
          />
          {errors.telefono && touched.telefono ? (
            <Alerta>{errors.telefono}</Alerta>
          ) : null }
        </div>

        <div className="mb-2">
        <label 
          className="text-gray-800"
          htmlFor="edad"
          >edad</label>
        <Field
          id="edad" 
          type="age"
          className="mt-2 block w-50% p-3 bg-gray-50"
          placeholder="edad"
          name="edad"
          />
          {errors.edad && touched.edad ? (
            <Alerta>{errors.edad}</Alerta>
          ) : null }
        </div>

        <div className="mb-2">
        <label 
          className="text-gray-800"
          htmlFor="peso"
          >peso</label>
        <Field
          id="peso" 
          type="number"
          className="mt-2 block w-50% p-3 bg-gray-50"
          placeholder="Peso del Paciente"
          name="peso"
          />
          {errors.edad && touched.edad ? (
            <Alerta>{errors.edad}</Alerta>
          ) : null }
        </div>

        <div className="mb-4">
        <label 
          className="text-gray-800"
          htmlFor="notas"
          >Notas</label>
        <Field
          as="textarea"
          id="notas" 
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50 h-40"
          placeholder="Notas del Paciente"
          name="notas"
          />
        </div>

        <input
          type="submit"
          value={paciente?.nombre ? 'Editar Paciente' : 'Agregar Paciente'}
          className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
          />
      </Form>
      ) 
    }}
    </Formik>
  </div>
  )
}

Formulario.defaultProps = {
  paciente: {}
}

export default Formulario