import React, { useState, useEffect } from 'react';
import { useUserContext } from '../Routers/UserProvider';
function AdminRegistration({ closeModal, adminData }) {

    const [reload, setReload] = useState(false);

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        birthdate: '',
        gender: '',
        phone: '',
        roles:'admin'
    });
    useEffect(() => {
        if (adminData) {
            setFormData(adminData);
        }
    }, [adminData]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Determina si estás actualizando o insertando basado en si `adminData` tiene un ID
        const isUpdating = adminData && adminData.ID;
        const baseUrl = 'https://carinosaapi.onrender.com/';
        const endpoint = isUpdating ? `api/update/${adminData.ID}` : 'user/insertadmin';
        const method = isUpdating ? 'PUT' : 'POST'; // Usa PUT para actualizar, POST para insertar

        try {
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: method, // Usa la variable `method`
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error al procesar la solicitud');
            }

            alert(`Administrador ${isUpdating ? 'actualizado' : 'insertado'} con éxito`);
            setReload(prev => !prev);
            closeModal();
        } catch (error) {
            console.error("Error:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const buttonText = adminData ? 'Modificar' : 'Registrar';

    return (
        <>

            <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Nombre - Requerido */}
                <div className="flex flex-col">
                    <label htmlFor="firstname" className="mb-2 font-semibold text-gray-700">Nombre</label>
                    <input type="text" name="firstname" required minLength="2" value={formData.firstname} onChange={handleChange} className="px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>

                {/* Apellidos - Requerido */}
                <div>
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Apellidos</label>
                    <input type="text" name="lastname" required minLength="2" value={formData.lastname} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                {/* Correo - Requerido y formato de correo */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                {/* Contraseña - Requerido, longitud mínima */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input type="text" name="password" required minLength="6" value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                {/* Fecha de Nacimiento - Requerido */}
                <div>
                    <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                    <input type="text" name="birthdate" required value={formData.birthdate} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                {/* Género - Requerido */}
                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Género</label>
                    <select name="gender" required value={formData.gender} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">Seleccione...</option>
                        <option value="Masculino" >Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                {/* Teléfono - Requerido y validación de formato */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input type="tel" name="phone" required pattern="[0-9]{10}" title="El teléfono debe tener 10 dígitos numéricos." value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                {/* Botón de envío */}
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {buttonText}
                </button>
            </form>
        </>
    );
}

export default AdminRegistration;
