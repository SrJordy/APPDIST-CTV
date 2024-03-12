import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, 
  faHandsHelping, 
  faUserTie,
  faHome  } from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [menuLateralAbierto, setMenuLateralAbierto] = useState(false);
  const [subMenuPacientesAbierto, setSubMenuPacientesAbierto] = useState(false);
  const [subMenuCuidadoresAbierto, setSubMenuCuidadoresAbierto] = useState(false);
  const [subMenuAdminAbierto, setSubMenuAdminsAbierto] = useState(false);
  const navigate = useNavigate();
  const navbarHeight = "4rem";

  const toggleMenuPerfil = () => {
    setMenuAbierto(!menuAbierto);
  };

  const toggleMenuLateral = () => {
    setMenuLateralAbierto(!menuLateralAbierto);
    
  };

  const toggleSubMenuPacientes = () => {
    setSubMenuPacientesAbierto(!subMenuPacientesAbierto);
  };

  const toggleSubMenuCuidadores = () => {
    setSubMenuCuidadoresAbierto(!subMenuCuidadoresAbierto);
  };
  const toggleSubMenuAdmin = () => {
    setSubMenuAdminsAbierto(!subMenuAdminAbierto);
  };

  const cerrarSesion = () => {
    navigate('/');
  };
  const perfil = () => {
    // Aquí puedes añadir cualquier lógica para manejar el cierre de sesión
    navigate("/Perfil");
  };
  const Home = () => {
    // Aquí puedes añadir cualquier lógica para manejar el cierre de sesión
    navigate("/Home");
  };

  return (
    <nav
      className="bg-pomegranate-400 text-white p-2 text-lg shadow-md"
      style={{ height: navbarHeight }}
    >
      <div className="container mx-auto flex justify-between items-center z-50">
  <a href="#"
   onClick={Home} 
   className="p-2 text-xl flex items-center font-bold text-Black-White-950 hover:text-big-stone-50 ">
    <FontAwesomeIcon icon={faHome} className="text-2xl mr-2 "/>
     <div className="mt-1">
     Inicio
     </div>
   
  </a>
        <div className="flex items-center">
        <img src="/Imagen/logo2.png" alt="Logo" className="h-8 mr-2" />
          <div className="font-bold text-xl text-black">
            HealthTracker
          </div>
        </div>

        <div className="flex items-center">
          <div className="relative ml-8">
            <div
              onClick={toggleMenuPerfil}
              className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
            >
              <span>U</span>
            </div>

            {menuAbierto && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                <a
                  href="#"
                  onClick={perfil}
                  className="flex items-center px-4 py-2 text-black hover:bg-pomegranate-200 hover:rounded-lg"
                >
                  <i className="fas fa-user mr-2  text-java-600"></i> Mi Perfil
                </a>
               
                <a
                  href="#"
                  onClick={cerrarSesion}
                  className="flex items-center px-4 py-2 text-black hover:bg-pomegranate-200 hover:rounded-lg"
                >
                  <i className="fas fa-sign-out-alt mr-2 text-java-600"></i>{" "}
                  Cerrar Sesión
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
{/*
      <div
        className={`fixed top-[${navbarHeight}] left-0 w-66 h-full bg-Black-White-50 shadow-md transform rounded-lg ${
          menuLateralAbierto ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
        style={{ top: navbarHeight }}
      >
        <button onClick={toggleMenuLateral} className="flex items-center p-2 hover:bg-java-500 hover:rounded-lg ">
          <i className="fas fa-arrow-left text-2xl text-Black-White-900"></i>
          <img
            src="/public/imagen/letras.png"
            alt="Descripción"
            className="h-8 w-65 ml-1"
          />
        </button>
        
        <ul>
          <li>
            <a  href="/Home"
              className="block p-2 flex items-center font-bold text-black hover:bg-pomegranate-200 hover:rounded-lg">
              <FontAwesomeIcon icon={faHome } className="mr-4   text-java-600" /> Inicio
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={toggleSubMenuPacientes}
              className="block p-2 flex items-center font-bold text-black hover:bg-pomegranate-200 hover:rounded-lg"
            >
              <FontAwesomeIcon icon={faUser} className="mr-4   text-java-600" /> Pacientes
            </a>
            {subMenuPacientesAbierto && (
              <ul className="ml-4">
                <li>
                  <a
                    href="#"
                    className="block p-2 text-center font-bold text-black hover:bg-pomegranate-200 hover:rounded-lg"
                  >
                    Opción 1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2 text-center font-bold text-black hover:bg-pomegranate-200 hover:rounded-lg"
                  >
                    Opción 2
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a
              href="#"
              onClick={toggleSubMenuCuidadores}
              className="block p-2 flex items-center font-bold text-black hover:bg-pomegranate-200 hover:rounded-lg"
            >
              <FontAwesomeIcon icon={faHandsHelping} className="mr-2  text-java-600" /> Cuidadores
            </a>
            {subMenuCuidadoresAbierto && (
              <ul className="ml-4">
                <li>
                  <a
                    href="#"
                    className="block p-2 text-center font-bold text-black hover:bg-pomegranate-200 hover:rounded-lg"
                  >
                    Opción 1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2 text-center font-bold text-black hover:bg-pomegranate-200 hover:rounded-lg"
                  >
                    Opción 2
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a
              href="#"
              onClick={toggleSubMenuAdmin}
              className="block p-2 flex items-center font-bold text-black hover:bg-pomegranate-200 hover:rounded-lg"
            >
              <FontAwesomeIcon icon={faUserTie} className="mr-4 text-java-600" /> Admin
            </a>
            {subMenuAdminAbierto && (
              <ul className="ml-4">
                <li>
                  <a
                    href="#"
                    className="block p-2 text-center font-bold text-black hover:bg-pomegranate-200 hover:rounded-lg"
                  >
                    Opción 1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2 text-center font-bold text-black hover:bg-pomegranate-200 hover:rounded-lg"
                  >
                    Opción 2
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
        
      </div>    */}
    </nav>
  );
}

export default Navbar;
