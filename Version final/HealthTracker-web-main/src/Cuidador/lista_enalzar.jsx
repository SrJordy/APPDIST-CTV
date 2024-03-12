import React, { useState, useEffect } from 'react';

function GetPaciente({ closeModal, cuidador }) {
    const [pacientes, setPacientes] = useState([]);
    useEffect(() => {
        const fetchPacientesEnlazados = async () => {
            try {
                const response = await fetch('https://carinosaapi.onrender.com/pacientecuidador/getAll');
                if (!response.ok) {
                    throw new Error('No se pudo obtener la lista de pacientes enlazados');
                }
                const data = await response.json();
                const pacientesDelCuidador = data.filter(d => d.CuidadorID === parseInt(cuidador.cuidaadorid));
                const pacienteIdsDelCuidador = pacientesDelCuidador.map(d => d.PacienteID);
                const pacientesEnlazados = pacientesDelCuidador.map(item => ({
                    id: item.PacienteID,
                    nombre: `${item.Paciente.User.firstname} ${item.Paciente.User.lastname}`,
                    cedula: item.Paciente.UserID,
                }));
    
                setPacientes(pacientesEnlazados);
            } catch (error) {
                console.error("Error al obtener los pacientes enlazados:", error);
            }
        };
    
        fetchPacientesEnlazados();
    }, [cuidador.cuidaadorid]); 

    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-50">
                <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                    <h3 className="text-xl font-semibold dark:text-black">
                        Pacientes Enlazados
                    </h3>
                    <button type="button" onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-500 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="p-6">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Nombres
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Cedula
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientes.map((paciente) => (
                                <tr key={paciente.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {paciente.nombre}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {paciente.cedula}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default GetPaciente;
