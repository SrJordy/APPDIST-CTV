import React, { useState , useEffect} from 'react';
import Navbar from '../Navegation/Navbar';
import { useUserContext } from '../Routers/UserProvider'; 

function Perfil () {
  const { user } = useUserContext(); // Obtiene el usuario del contexto, que incluye el rol
  const [loadedUser, setLoadedUser] = useState(user);
  useEffect(() => {
    setLoadedUser(user);
  }, [user]);

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <div className="flex items-center justify-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Avatar"
            className="w-20 h-20 rounded-full"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-800">Nombre de Usuario {loadedUser.userId}</h2>
          <p className="text-gray-500">Correo electrónico@example.com</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Información Personal</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <span className="text-gray-500">Nombre:</span> John Doe
            </li>
            <li>
              <span className="text-gray-500">Fecha de Nacimiento:</span> 01 de enero de 1990
            </li>
            {/* Agrega más información personal según sea necesario */}
          </ul>
        </div>
        
      </div>
    </div>
    </div>
  );
};

export default Perfil;
