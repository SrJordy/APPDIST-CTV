import React, { useState, useEffect } from 'react';
import { useUserContext } from '../Routers/UserProvider';
function PatientRegistration({ closeModal, handleSubmit2,adminData }) {
   
    useEffect(() => {
        if (adminData) {
            setFormData(adminData);
        }
    }, [adminData]);

    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        correo: '',
        contraseña: '',
        fechaNacimiento: '',
        genero: '',
        telefono: '',
        ritmoCardiaco: '',
        numeroEmergencia: ''
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        handleSubmit2(formData); // Esta función ahora debe manejar tanto la creación como la actualización
        closeModal(); // Cerrar el modal después del envío
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <>
           
            <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="nombre" className="mb-2 font-semibold text-gray-700">Nombre</label>
                    <input type="text" name="nombre" required minLength="2" value={formData.nombre} onChange={handleChange} className="px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>

                {/* Apellidos - Requerido */}
                <div>
                    <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">Apellidos</label>
                    <input type="text" name="apellidos" required minLength="2" value={formData.apellidos} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                   {/* Correo - Requerido y formato de correo */}
                   <div>
                    <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input type="email" name="correo" required value={formData.correo} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                {/* Contraseña - Requerido, longitud mínima */}
                <div>
                    <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input type="password" name="contraseña" required minLength="6" value={formData.contraseña} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>


               {/* Fecha de Nacimiento - Requerido */}
               <div>
                    <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                    <input type="text" name="fechaNacimiento" required value={formData.fechaNacimiento} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>


                {/* Género - Requerido */}
                <div>
                    <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Género</label>
                    <select name="genero" required value={formData.genero} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">Seleccione...</option>
                        <option value="Masculino" >Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                {/* Teléfono - Requerido y validación de formato */}
                <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input type="tel" name="telefono" required pattern="[0-9]{10}" title="El teléfono debe tener 10 dígitos numéricos." value={formData.telefono} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>


                {/* Ritmo Cardíaco */}
                <div>
                    <label htmlFor="ritmoCardiaco" className="block text-sm font-medium text-gray-700">Ritmo Cardíaco</label>
                    <input type="number" required pattern="[0-9]" name="ritmoCardiaco" value={formData.ritmoCardiaco} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                {/* Número de Emergencia */}
                <div>
                    <label htmlFor="numeroEmergencia" className="block text-sm font-medium text-gray-700">Número de Emergencia</label>
                    <input type="tel" required pattern="[0-9]{10}" name="numeroEmergencia" value={formData.numeroEmergencia} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                {/* Botón de envío */}
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Registrar
                </button>
            </form>
        </>
    );
}

export default PatientRegistration;
