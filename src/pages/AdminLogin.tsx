import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // useNavigate se usará en AuthContext, no directamente aquí para el éxito de login
import { useAuth } from '../context/AuthContext'; // Importa tu hook de autenticación

interface AdminLoginData {
  usernameOrEmail: string;
  password: string;
}

function AdminLogin() {

  const { login } = useAuth(); // Obtenemos la función login del contexto de autenticación

  const [formData, setFormData] = useState<AdminLoginData>({
    usernameOrEmail: "",
    password: "",
  });

  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage('');
    setError('');

    try {
      // Asegúrate de que esta URL y puerto coincidan con tu backend
      // Si tu backend está en el puerto 5000, cámbialo a 'http://localhost:5000/api/users/loginAdminAuth'
      const backendUrl = 'http://localhost:3000/api/users/loginAdminAuth'; // Usando el PORT de tu app.ts (5000 por defecto)

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Respuesta de Fetch (objeto response):', response);
      console.log('response.ok:', response.ok);
      console.log('response.status:', response.status);

      const data = await response.json(); // Siempre intenta parsear la respuesta

      console.log('Datos parseados de la respuesta (data):', data);
      console.log('data.error:', data.error);
      console.log('data.token:', data.token); // Para verificar que el token llega

      if (response.ok) {
        setMessage(data.message);
        if (data.token) {
          login(data.token); // Llama a la función login del contexto con el token
          // El contexto de autenticación ahora se encargará de la redirección a '/'
          // dentro de su función `login` si se configuró para eso.
          // O la redirección es automática al usar navigate en el AuthProvider.
        } else {
          setError("Login successful, but no token received."); // Si no llega token
        }
      } else {
        setError(data.error || 'Ocurrió un error inesperado al iniciar sesión.');
      }

    } catch (err) {
      console.error("Error al conectar con el backend o procesar la respuesta:", err);
      setError("No se pudo conectar con el servidor. Verifica que el backend esté funcionando y accesible.");
    }
  };

 return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
      {/* Logo y título */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Panel Admin</h1>
        <p className="text-gray-600">Acceso exclusivo para administradores</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Usuario/Email */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Usuario o Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="username"
              type="text"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150"
              placeholder="usuario@ejemplo.com"
              required
            />
          </div>
        </div>

        {/* Campo Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {/* Botón de Submit */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
          >
            Iniciar Sesión
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Mensajes de feedback */}
        {message && (
          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-700 font-medium">{message}</p>
            </div>
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}
      </form>

      {/* Enlace de ayuda */}
      <div className="mt-6 text-center">
        <a href="#" className="text-sm font-medium text-red-600 hover:text-red-500">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </div>
  </div>
);
}

export default AdminLogin;
