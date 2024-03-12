import React, { useState,useEffect } from 'react';
import Navbar from '../Navegation/Navbar';
import PatientRegistration from './Register';
import { useUserContext } from '../Routers/UserProvider'; 
function ListaPacientes() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [editPscienteData, setEditPaceinteData] = useState(null);

    const { user } = useUserContext(); // Obtiene el usuario del contexto, que incluye el rol
    const [loadedUser, setLoadedUser] = useState(user);
  
    const [pacientes, setPacientes] = useState([
        {
            id: 1,
            nombre: 'Juan',
            apellidos:'Pérez',
            correo: 'juanperez@example.com',
            contraseña: '********',
            telefono: '123456789',
            fechaNacimiento:'12-12-1999',
            ritmoCardiaco: '77',
            numeroEmergencia: '000000000',
        },
        // Más pacientes aquí...
    ]);

    useEffect(() => {
        setLoadedUser(user);
      }, [user]);
    

    const handleDelete = (id) => {
        // Muestra un diálogo de confirmación
        const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este administrador?');
        if (isConfirmed) {
            // Si el usuario confirma, procede con la eliminación
            const updatedPacientes = pacientes.filter(paciente => paciente.id !== id);
            setPacientes(updatedPacientes);
        }
        // Si el usuario no confirma, no hagas nada
    };
    
    const openEditModal = (PacienteData) => {
        setEditPaceinteData(PacienteData); // Establece los datos del admin a editar
        setIsModalOpen(true); // Abre el modal
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditPaceinteData(null); // Limpia los datos del admin a editar al cerrar el modal
    };



    return (
        <>
            <Navbar />
            {/* Encabezado y botón de registro */}
            <div className=" mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-gray-700">Pacientes Registrados {loadedUser.userId}</h1>
                    <button onClick={openModal} className="bg-java-800 hover:bg-java-400 hover:text-Black-White-950 text-white font-bold py-2 px-4 rounded">
                        Registrar Paciente
                    </button>
                </div>

                {isModalOpen && (
                     <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
                     <div className="relative top-10 mx-auto p-5 border shadow-lg rounded-md bg-white" style={{ maxWidth: '50%' }}>
                         <button onClick={closeModal} className="absolute top-0 right-0 mt-2 mr-2">
                             <i className="fas fa-times"></i>
                         </button>
                         <PatientRegistration closeModal={closeModal} />
                     </div>
                 </div>
                )}

                {/* Tabla de pacientes */}
                <div className="overflow-x-auto">
                <table className="min-w-full bg-white " style={{ minWidth: "100%" }}>
                        <thead className="bg-curious-blue-700 text-white">
                            <tr>
                                <th className="px-4 py-2">Foto</th>
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">Correo</th>
                                <th className="px-4 py-2">Contraseña</th>
                                <th className="px-4 py-2">Fecha de nacimiento</th>
                                <th className="px-4 py-2">Teléfono</th>
                                <th className="px-4 py-2">Ritmo Cardiaco</th>
                                <th className="px-4 py-2">Teléfono de Emergencia</th>
                                <th className="px-4 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {pacientes.map((paciente) => (
                                <tr key={paciente.id}>
                                    <td className="border px-4 py-2"></td>
                                    <td className="border px-4 py-2">{paciente.nombre + ' ' + paciente.apellidos}</td>
                                    <td className="border px-4 py-2">{paciente.correo}</td>
                                    <td className="border px-4 py-2">{paciente.contraseña}</td>
                                    <td className="border px-4 py-2">{paciente.fechaNacimiento}</td>
                                    <td className="border px-4 py-2">{paciente.telefono}</td>
                                    <td className="border px-4 py-2">{paciente.ritmoCardiaco}</td>
                                    <td className="border px-4 py-2">{paciente.numeroEmergencia}</td>
                                    <td className="border px-4 py-2">
                                        <button 
                                         onClick={() => openEditModal(paciente)}
                                        className="bg-yellow-700 hover:bg-yellow-300 hover:text-black text-white font-bold py-1 px-2 rounded mr-2">
                                            Modificar
                                        </button>
                                        <button
                                         onClick={() => handleDelete(paciente.id)}
                                        className="bg-pomegranate-900 hover:bg-pomegranate-500 hover:text-black text-white font-bold py-1 px-2 rounded">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
                            <div className="relative top-10 mx-auto p-5 border shadow-lg rounded-md bg-white" style={{ maxWidth: '50%' }}>
                                <button onClick={closeModal} className="absolute top-0 right-0 mt-2 mr-2">
                                    <i className="fas fa-times"></i>
                                </button>
                                < PatientRegistration closeModal={closeModal} adminData={editPscienteData} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ListaPacientes;
