import React, { useEffect, useState } from 'react';
import { useUserContext } from '../Routers/UserProvider'; // Asegúrate de que la ruta de importación es correcta
import Navbar from '../Navegation/Navbar';
import CardButton from '../Navegation/CardButton';
import patient from '../Lottie/patient.json';
import carer from '../Lottie/carer.json';
import Admin from '../Lottie/Admin.json';
import { useNavigate } from 'react-router-dom';
function Home() {
  const { user } = useUserContext(); // Obtiene el usuario del contexto, que incluye el rol
  const [loadedUser, setLoadedUser] = useState(user);

  const [pacientes, setPacientes] = useState([
    { id: 1, nombre: 'Paciente 1',parentesco:'Padre' },
    { id: 2, nombre: 'Paciente 2', parentesco:'Madre' },
    { id: 3, nombre: 'Paciente 3', parentesco:'Abuelo' },
  ]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
  };

  useEffect(() => {
    // Recupera toda la información del usuario desde localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const userInfo = JSON.parse(storedUser);
        setLoadedUser(userInfo);
    }
}, []);


  return (
    <div className='bg-black-white-100'>
  <Navbar />
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-curious-blue-900 mb-6">Bienvenido, {loadedUser.firstname} </h1>
    {loadedUser.roles === 'admin' && (
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-20">
        <CardButton animationData={Admin} options={defaultOptions} title="Administración" navigateTo="/Lista_Admin" />
        <CardButton animationData={patient} options={defaultOptions} title="Pacientes" navigateTo="/Lista_paciente" />
        <CardButton animationData={carer} options={defaultOptions} title="Cuidadores" navigateTo="/Lista_cuidador" />
      </div>
    )}
    {loadedUser.roles === 'cuidador' && (
      <div className="max-w-lg mx-auto">
      <p className="text-xl font-semibold mb-4">Rol: {loadedUser.role}</p>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-black dark:text-big-stone-800 font-bold ">
            <thead className="text-1xl text-black uppercase bg-gray-50 dark:bg-java-500 dark:text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Paciente
                </th>
                <th scope="col" className="px-6 py-3">
                  Parentesco
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id} className="bg-Black-White-300 border-b dark:bg-Black-White-100 dark:border-gray-400 hover:bg-gray-50 dark:hover:bg-curious-blue-300">
                  <td className="px-6 py-4 text-lg">
                    {paciente.nombre}
                  </td>
                  <td className="px-6 py-4   text-lg text-center">
                    {paciente.parentesco}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => verMasInformacion(paciente.id)}
                      className="text-white bg-pomegranate-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-pomegranate-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pomegranate-400 dark:hover:bg-pomegranate-600 dark:focus:bg-pomegranate-800"
                    >
                      Ver más información
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
              )}
             
  </div>
</div>

  );
}
export default Home;