import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';

function Recover() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica de recuperación de contraseña
    // Por ahora, solo marcamos que se ha enviado la solicitud
    setIsSubmitted(true);
  };

  return (
    <div className=" bg-cover flex items-center justify-center h-screen bg-gray-200">
      <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
      <div className='flex justify-center items-center '>
          <img src="/public/imagen/logo2.png" className='w-36 ju'/>
          </div>
        <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
          Recuperar Contraseña
        </h2>
        {isSubmitted ? (
          <p className="text-sm text-gray-700 mt-2">
            Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.
          </p>
        ) : (
          <>
            <p className="text-sm text-gray-700 mt-2">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className='relative'>
              <FontAwesomeIcon icon={faEnvelope} className="absolute inset-y-3 left-0 pl-3 flex items-center text-gray-500" />
              <input
              aria-label="Correo electrónico"
              name="email"
              type="email"
              required
              value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="icon-input appearance-none rounded-none block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-curious-blue-700 focus:border-curious-blue-700 focus:z-10 sm:text-sm"
              placeholder="Correo electrónico"
            />
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pomegranate-500 hover:bg-pomegranate-400 focus:outline-none focus:bg-pomegranate-950 focus:ring-indigo active:bg-pomegranate-500"
                >
                  Enviar Enlace
                </button>
              </div>
            </form>
          </>
        )}

        <div className="mt-4">
          <button
            onClick={() => navigate('/')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-pomegranate-500 bg-white hover:text-pomegranate-700 focus:outline-none focus:border-pomegranate-300 focus:ring focus:ring-pomegranate-200"
          >
            Volver al Inicio de Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recover;
