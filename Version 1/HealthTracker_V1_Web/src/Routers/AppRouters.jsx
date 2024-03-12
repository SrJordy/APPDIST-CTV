import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute'; // Asegúrate de importar el componente correctamente
import Iniciosecion from '../Pages/login'
import Recover from '../Pages/Recover'
import Home from '../Pages/Home'
import Perfil from '../Pages/profile'
import ListaPacientes from '../Paciente/list'
import ListaAdmin from '../Admin/List_Adminis'
import Curer from '../Cuidador/Curer'

function AppRouters () {
  return (
    <Routes>
        <Route path='/' element={<Iniciosecion/>}/>
        <Route path='/Home' element={
            <ProtectedRoute roles={['admin','caretaker']}>
        <Home/>
        </ProtectedRoute>
        }/>
        <Route path='/Recuperar-contraseña' element={<Recover/>}/> 
        <Route path='/Perfil' element={
            <ProtectedRoute roles={['admin','caretaker']}>
        <Perfil/>
        </ProtectedRoute>}/> 
        
        <Route
          path='/Lista_paciente'
          element={
            <ProtectedRoute roles={['admin']}>
              <ListaPacientes/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/Lista_Admin'
          element={
            <ProtectedRoute roles={['admin']}>
              <ListaAdmin/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/Lista_cuidador'
          element={
            <ProtectedRoute roles={['admin']}>
              <Curer/>
            </ProtectedRoute>
          }
        />
    </Routes>
  )
}

export default AppRouters;
