import React from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
function CardButton({ title, animationData, options, navigateTo }) {
  const buttonStyle = {
    width: '350px', // Ancho personalizado
    height: '300px', // Alto personalizado
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.2s ease',
    outline: 'none',
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);
  };
  const animationStyle = {
    width: '100%', // Ajusta el ancho al 100% del contenedor
    height: '100%', // Ajusta la altura al 100% del contenedor
  };

  return (
    <div className="relative bg-java-400 rounded-xl shadow-lg overflow-hidden group">
      <button style={buttonStyle} className=" bg-java-600 hover:bg-curious-blue-800 focus:outline-none"
    onClick={handleClick}>
        <Lottie options={{ ...options, animationData }} style={animationStyle} />
        <p className="text-2xl font-bold text-java-950 group-hover:text-Black-White-50">{title}</p>
      </button>
    </div>
  );
}

export default CardButton;
