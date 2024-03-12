import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Iniciosecion from '../Pages/login'
import Recover from '../Pages/Recover'
import Home from '../Pages/Home'
import Perfil from '../Pages/profile'
import ListaPacientes from '../Paciente/list'
import ListaAdmin from '../Admin/List_Adminis'
import Curer from '../Cuidador/Curer'

function AppRouters() {
    return (
    <Routes>
        <Route path='/' element={<Iniciosecion/>}/>
        <Route path='/Home' element={
            // Envuelve Home dentro de ProtectedRoute sin prop de roles
           
                <Home/>
            
        }/>
        <Route path='/Recuperar-contraseña' element={<Recover/>}/> 
        <Route path='/Perfil' element={
            // ProtectedRoute sin prop de roles para Perfil
           
                <Perfil/>
            
        }/>
        
        <Route path='/Lista_paciente' element={
            // ProtectedRoute sin prop de roles para ListaPacientes
           
                <ListaPacientes/>
           
        }/>
        <Route path='/Lista_Admin' element={
            // ProtectedRoute sin prop de roles para ListaAdmin
           
                <ListaAdmin/>
           
        }/>
        <Route path='/Lista_cuidador' element={
            // ProtectedRoute sin prop de roles para Curer
           
                <Curer/>
         
        }/>
         
    </Routes>
   
  )
}

export default AppRouters;
