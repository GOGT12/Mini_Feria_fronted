import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'


import './App.css'

//Header And Footer
import Header from './components/Header'
import Footer from './components/Footer'
//////////        PAGES      ////////////
import MiniFeria from './pages/MiniFeria'
/// USERS ///
import AdminLogin from './pages/AdminLogin'
import Admins from './pages/Admins'
import EditSuperAdmin from './pages/EditSuperAdmin'
//////////   CATEGORIES       ///////////
import Categories from './pages/Categories'
////////////     PRODUCTS     //////////
import AddProduct from './pages/AddProduct'
import ProductDetails from './pages/ProductDetails'

// AUTH
import { AuthProvider, useAuth } from './context/AuthContext'




// Componente ProtectedRoute: Para rutas que requieren autenticación
// Este componente decide si el usuario puede acceder a una ruta o debe ser redirigido
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Opcional: roles específicos permitidos
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {

  const { isAuthenticated, user, isAuthReady } = useAuth(); // Obtiene el estado de autenticación

  console.log(`esta autenticado ?${isAuthenticated}`)
  console.log('--- ProtectedRoute Info ---');
  console.log('Ruta intentada (children):', children ? 'Sí (componente hijo)' : 'No (componente hijo)');
  console.log('isAuthenticated:', isAuthenticated);
  console.log('user object:', user);
  if (user) {
    console.log('user.role:', user.role);
  } else {
    console.log('user: null (no user data)');
  }
  console.log('allowedRoles:', allowedRoles);
  // --- FIN DEPURACIÓN ---

  if (!isAuthReady) {
    // Mientras no esté listo, puedes mostrar un spinner, un mensaje de carga, o null.
    // Mostrar null evita un parpadeo de redirección si la sesión se restaura rápidamente.
    console.log('ProtectedRoute: Esperando a que AuthContext esté listo...');
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Cargando autenticación...</p>
      </div>
    );
  }



  if (!isAuthenticated) {
    console.log('Todavia no tienes la autentificacioon')
    // Si no está autenticado, redirige al login
    return <Navigate to="/" replace />;
  }

  // Si se especifican roles permitidos, verifica si el usuario tiene uno de ellos
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Si el usuario no tiene el rol permitido, redirige a una página de acceso denegado o home
    console.warn(`Acceso denegado. Rol del usuario: ${user.role}, Roles permitidos: ${allowedRoles.join(', ')}`);
    return <Navigate to="/" replace />; // O a una página /access-denied
  }

  return <>{children}</>; // Si está autenticado y tiene el rol, renderiza el contenido
};

function App() {


  return (
    <>

    <Router>
      {/* Envuelve toda tu aplicación con AuthProvider */}
      <AuthProvider>
      <Routes>
        <Route path='/' element=
          {
            <>
              <Header/>
              <MiniFeria/>
              <Footer/>
            </>
          }/>


        {/* ///////////      USERS         //////////// */}
        <Route path='/admin-login'
        element={
          <AdminLogin/>
        }/>

        <Route path='/Admins'
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <Admins/>
          </ProtectedRoute>
        }
        />

        <Route path='/edit-super-admin'
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <EditSuperAdmin/>
          </ProtectedRoute>

        }
        />

        {/* //////////////////////       CATEGORIES       ////////////////////////*/}

        <Route path='/categories'
        element={
          <ProtectedRoute allowedRoles={['super_admin', 'admin']}>
            <Categories/>
          </ProtectedRoute>

        }
        />

        {/* ////////////////////////     PRODUCTS        /////////////////////*/}

        <Route path='/add-product'
          element={
            <ProtectedRoute allowedRoles={['super_admin', 'admin']}>
              <AddProduct/>
            </ProtectedRoute>

          }
        />

        <Route path='/product/:id'
          element={
            <>
              <Header/>
              <ProductDetails/>
              <Footer/>
            </>
          }
        />


        {/* Puedes añadir una ruta de "No encontrado" */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
            <h1 className="text-4xl font-bold mb-4">404 - Página No Encontrada</h1>
            <p className="text-lg">La ruta que buscas no existe.</p>
          </div>
        } />


      </Routes>
      </AuthProvider>
    </Router>

    </>
  )
}

export default App
