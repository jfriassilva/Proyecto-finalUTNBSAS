import {useState , useEffect} from 'react'
import Paciente from '../componentes/Paciente'

const Inicio = () => {

  const [pacientes, setPacientes] = useState([])

useEffect(() => {
    const obtenerPacientesAPI = async () => {
      try {
          const url = 'http://localhost:4000/pacientes'
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()

          setPacientes(resultado)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerPacientesAPI()
}, [])

  return (
    <>
    <h1 className="font-black text-4xl text-blue-900">Pacientes</h1>
    <p className="mt-3">Administra tus pacientes</p>

    <table className="w-full mt-5 table-auto shadow bg-white">
      <thead className='bg-blue-800 text-white'>
        <tr>
          <th className="p-2">Nombre</th>
          <th className="p-2">Contacto</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>

      <tbody>
          {pacientes.map( paciente => (
            <Paciente
              key={paciente.id}
              paciente={paciente}
            />
          ))}
      </tbody>
    </table>
    </>
  )
}

export default Inicio