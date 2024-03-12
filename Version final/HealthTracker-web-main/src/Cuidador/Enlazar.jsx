import React, { useState, useEffect } from 'react';

function LinkModal({ closeModal, cuidador }) {
  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState('');

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch('https://carinosaapi.onrender.com/user/getAllRoles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role: "paciente" }),
        });

        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de pacientes');
        }

        const responseData = await response.json();
        if (responseData && responseData.users) {
          setPacientes(responseData.users.map(user => ({
            id: user.Paciente.ID,
            nombre: user.firstname,
            apellidos: user.lastname,
          })));
        }
      } catch (error) {
        console.error("Error al obtener los pacientes:", error);
      }
    };

    fetchPacientes();
  }, []); // Dependencias vacías para ejecutar solo al montar el componente
  
  const enlazarPacienteConCuidador = async () => {
    if (!selectedPaciente || !cuidador) {
      alert('Debe seleccionar un paciente y tener un cuidador seleccionado.');
      return;
    }
    alert(`Objeto cuidador: ${JSON.stringify(cuidador, null, 2)}`);

    const requestBody = JSON.stringify({
      PacienteID: Number(selectedPaciente),
      CuidadorID: cuidador.cuidaadorid
    });
  
    // Alerta para mostrar el cuerpo de la solicitud
    alert(`Cuerpo de la solicitud: ${requestBody}`);
  
    try {
      const response = await fetch('https://carinosaapi.onrender.com/pacientecuidador/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });
  
      const responseData = await response.json(); // Intenta parsear la respuesta independientemente del status de la respuesta
  
      if (!response.ok) {
        throw new Error(responseData.error || 'Error al enlazar paciente con cuidador');
      }
  
      console.log(responseData); 
      alert('Paciente enlazado con éxito.');
      closeModal(); 
    } catch (error) {
      console.error("Error al enlazar paciente con cuidador:", error);
      alert("Error al enlazar paciente con cuidador: " + error.message);
    }
  };
  
  

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow dark:bg-Black-White-50">
        <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <h3 className="text-xl font-semibold text-white dark:text-black">
            Enlazar Paciente con Cuidador
          </h3>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-500 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label htmlFor="cuidador" className="block mb-2 text-sm font-medium text-black dark:text-black">Cuidador:</label>
            <input
              id="cuidador"
              type="text"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 dark:bg-Black-White-200 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
              value={cuidador ? `${cuidador.nombre} ${cuidador.apellidos}` : ''} // Corregido para usar prop 'cuidador'
              readOnly
            />
          </div>
          <div>
            <label htmlFor="cuidador" className="block mb-2 text-sm font-medium text-black dark:text-black">Paciente:</label>
            <select
              id="paciente"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-Black-White-200 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
              value={selectedPaciente}
              onChange={e => setSelectedPaciente(e.target.value)}
            >
              <option value="">Seleccione un paciente</option>
              {pacientes.map(paciente => (
                <option key={paciente.id} value={paciente.id}>
                  {paciente.nombre} {paciente.apellidos}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              className="px-4 py-2 bg-java-900 text-white hover:text-black text-sm font-medium rounded hover:bg-java-300 focus:outline-none focus:bg-java-300"
              onClick={enlazarPacienteConCuidador} // Aquí conectas el botón con la función
            >
              Enlazar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkModal;
