import React, { useState, useEffect } from 'react';
import Navbar from '../Navegation/Navbar';
import PatientRegistration from './Register';
import { useUserContext } from '../Routers/UserProvider';
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';

function ListaPacientes() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [editPacienteData, setEditPacienteData] = useState(null);
    const [reload, setReload] = useState(false);
    const { user } = useUserContext();
    const [showPassword, setShowPassword] = useState({});
    const [pacientes, setPacientes] = useState([]);

    const toggleShowPassword = (id) => {
        setShowPassword(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };
    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await fetch('https://carinosaapi.onrender.com/user/getAllRoles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ role: "paciente" })
                });

                if (!response.ok) {
                    throw new Error('No se pudo obtener la lista de pacientes');
                }

                const responseData = await response.json();
                if (responseData && responseData.users) {
                    setPacientes(responseData.users.map(user => ({
                        id: user.ID,
                        nombre: user.firstname,
                        apellidos: user.lastname,
                        correo: user.email,
                        contraseña: user.password,
                        telefono: user.phone,
                        genero:user.gender,
                        fechaNacimiento: user.birthdate,
                        numeroEmergencia: user.Paciente ? user.Paciente.numeroEmergencia : 'N/A',
                    })));
                }
            } catch (error) {
                console.error("Error al obtener los pacientes:", error);
                alert("Error al obtener los pacientes: " + error.message);
            }
        };

        fetchPacientes();
    }, [user, reload])


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
        setEditPacienteData(PacienteData); // Establece los datos del admin a editar
        setIsModalOpen(true); // Abre el modal
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditPacienteData(null); // Limpia los datos del admin a editar al cerrar el modal
        setReload(prev => !prev); // Cambia el estado para forzar la recarga
    };



    return (
        <>
            <Navbar />
            {/* Encabezado y botón de registro */}
            <div className=" mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-gray-700">Pacientes Registrados </h1>
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
                                <th className="px-4 py-2">Nombre</th>
                                <th className="px-4 py-2">Correo</th>
                                <th className="px-4 py-2">Contraseña</th>
                                <th className="px-4 py-2">Fecha de nacimiento</th>
                                <th className="px-4 py-2">Teléfono</th>
                                <th className="px-4 py-2">Genero</th>
                                <th className="px-4 py-2">Teléfono de Emergencia</th>
                                <th className="px-4 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {pacientes.map((paciente) => (
                                <tr key={paciente.id}>
                                    <td className="border px-4 py-2">{paciente.nombre + ' ' + paciente.apellidos}</td>
                                    <td className="border px-4 py-2">{paciente.correo}</td>
                                    <td className="border px-4 py-2">
                                        <div className="flex items-center justify-between">
                                            <input
                                                type={showPassword[paciente.id] ? 'text' : 'password'}
                                                value={paciente.contraseña}
                                                readOnly
                                                className="bg-transparent border-none w-full"
                                            />
                                            <button
                                                onClick={() => toggleShowPassword(paciente.id)}
                                                className="ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                                            >
                                                {showPassword[paciente.id] ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2">{paciente.fechaNacimiento}</td>
                                    <td className="border px-4 py-2">{paciente.telefono}</td>
                                    <td className="border px-4 py-2">{paciente.genero}</td>
                                    <td className="border px-4 py-2">{paciente.numeroEmergencia}</td>
                                    <td className="border px-4 py-2">
                                        <div className="flex justify-center items-center space-x-2">
                                            <button onClick={() => openEditModal(paciente)} className="text-yellow-700 hover:text-yellow-300" title='Modificar'>
                                                <FaEdit size="20px" />
                                            </button>
                                            <button onClick={() => handleDelete(paciente.id)} className="text-red-700 hover:text-red-300" title='Eliminar'>
                                                <FaTrash size="20px" />
                                            </button>
                                        </div>
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
                                < PatientRegistration closeModal={closeModal} patientData={editPacienteData} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ListaPacientes;
