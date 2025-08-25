import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const isSuperAdmin = user && (user.role === 'super_admin');
  const isAdmin = user && (user.role === 'admin' || user.role === 'super_admin');

  //const [isOpen, setIsOpen] = useState(false);
 // const categories = ['Ropa', 'Calzado'];


  return (
    <header className="bg-red-600 w-100 shadow-md px-4 py-2 font-sans">
      {/* Logo */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg lg:text-4xl">Mini-Feria</h1>
      </div>

      {/* Menú */}

      <div className="flex flex-col gap-1 sm:flex-row justify-between">
        <div className="flex  flex-wrap  items-center gap-2 ">
          {/* Home */}
          <a
            href="/"
            className="text-sm font-bold text-white bg-black px-1 py-1 rounded-lg hover:bg-gray-900 hover:translate-y-[-2px] transition-all duration-300 lg:text-lg"
          >
            Home
          </a>
          {/* Dropdown Categorías
          <div className="relative">
            <div
              className="inline-block"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button className="text-xl font-bold text-white px-4 py-1 rounded-lg hover:bg-black/20 transition-colors duration-300">
                Categorías
              </button>
            </div>
            {isOpen && (
              <div
                className="absolute top-full left-0 w-48 bg-white border border-gray-200 rounded-b-lg shadow-xl z-50"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                {categories.map((category) => (
                  <a
                    key={category}
                    href="#"
                    className="block px-4 py-2 text-sm font-semibold text-black hover:bg-red-600 hover:text-white transition-colors duration-200"
                  >
                    {category}
                  </a>
                ))}
              </div>
            )}
          </div>
          */}
          {/* Admin Loguin */}
          <Link to={'/admin-login'}
          >
            <button
              className=" text-sm text-white bg-black px-1 py-1 rounded-lg font-bold hover:bg-gray-800 transition-colors lg:text-lg"
            >Admin Login
            </button>
          </Link>

          {isSuperAdmin ? (
            <Link to={'/Admins'}
          >
            <button
              className=" text-sm text-white bg-black px-1 py-1 rounded-lg font-bold hover:bg-gray-800 transition-colors lg:text-lg"
            >Crete Admin
            </button>
          </Link>
          ) : ('')}

          {isSuperAdmin ? (
            <Link to={'/edit-super-admin'}
          >
            <button
              className=" text-sm text-white bg-black px-1 py-1 rounded-lg font-bold hover:bg-gray-800 transition-colors lg:text-lg"
            >Edit SA
            </button>
          </Link>
          ) : ('')}
        </div>

        <div>
          {isAdmin && (
            <div className="flex gap-2">
              <Link to={'/add-product/'}
              >
                <button className="text-sm text-white bg-black px-1 py-1 rounded-lg font-bold hover:bg-gray-800 transition-colors lg:text-lg">
                Añadir Producto
                </button>
              </Link>
              <div>
                <Link to={'/categories/'}>
                  <button
                    className="text-sm text-red-700 bg-black px-3 py-1 rounded-lg font-bold hover:bg-gray-800 transition-colors lg:text-lg"
                    >Categorías
                  </button>
                </Link>
              </div>
              <button
                onClick={logout}
                className="text-sm text-red-100 bg-red-800 px-1 py-1 rounded-lg font-bold hover:bg-red-900 transition-colors lg:text-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;
