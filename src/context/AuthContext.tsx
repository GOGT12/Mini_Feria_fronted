import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar en logout o si el token expira
import { jwtDecode } from 'jwt-decode'; // Necesitarás instalar 'jwt-decode'

// Instalar jwt-decode:
// npm install jwt-decode
// npm install --save-dev @types/jwt-decode

// Define la forma de los datos del usuario que tendremos en el estado
interface UserAuth {
  id: string;
  username: string;
  email: string;
  role: string;
}

// Define la forma del contexto de autenticación
interface AuthContextType {
  isAuthenticated: boolean;
  user: UserAuth | null;
  login: (token: string) => void; // Función para iniciar sesión
  logout: () => void;            // Función para cerrar sesión
  isAuthReady: boolean
}

// Crea el contexto de React con valores por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Interfaz para el payload de tu JWT (lo que pones en jwt.sign en el backend)
interface JwtPayload {
  id: string;
  username: string;
  email: string;
  role: string;
  exp: number; // Expiración del token (Unix timestamp)
  iat: number; // Emitido en (Unix timestamp)
}

// Componente proveedor del contexto
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserAuth | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const navigate = useNavigate(); // Hook para la navegación

  // Efecto para cargar el token y el usuario desde localStorage al iniciar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        // Verifica si el token ha expirado
        if (decodedToken.exp * 1000 > Date.now()) { // exp está en segundos, Date.now() en ms
          setIsAuthenticated(true);
          setUser({
            id: decodedToken.id,
            username: decodedToken.username,
            email: decodedToken.email,
            role: decodedToken.role,
          });
          console.log('Token JWT cargado y válido:', decodedToken.role);
        } else {
          // Token expirado
          console.log('Token JWT expirado.');
          localStorage.removeItem('jwtToken');
          setIsAuthenticated(false);
          setUser(null);
          // Opcional: redirigir a login si el token ha expirado al cargar la app
          // navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Error decodificando el token JWT:', error);
        localStorage.removeItem('jwtToken'); // Limpiar token inválido
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    setIsAuthReady(true);
    console.log('AuthContext: Verificacion completada. ')
  }, []); // Se ejecuta solo una vez al montar el componente


  // Función para iniciar sesión (llamada desde el componente de login)
  const login = (token: string) => {
    localStorage.setItem('jwtToken', token); // Guarda el token
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      setIsAuthenticated(true);
      setUser({
        id: decodedToken.id,
        username: decodedToken.username,
        email: decodedToken.email,
        role: decodedToken.role,
      });
      console.log('Usuario logueado y token guardado.');
      navigate('/', {replace: true});
    } catch (error) {
      console.error('Error al decodificar el token después del login:', error);
      localStorage.removeItem('jwtToken');
      setIsAuthenticated(false);
      setUser(null);
      // Podrías lanzar un error o mostrar un mensaje
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
    setUser(null);
    console.log('Sesión cerrada.');
    navigate('/', { replace: true }); // Redirige al login al cerrar sesión
  };

  // El valor que se proporciona a los componentes que consumen el contexto
  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    isAuthReady,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
