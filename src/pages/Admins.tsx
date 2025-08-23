
import React, { useState, useEffect } from "react";


function isValidPassword(password: string):boolean {
  if (typeof password !== 'string'){
    return false
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`-])[A-Za-z\d!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`-]{8,}$/;
  return passwordRegex.test(password)
};




function Admins(){

  //////////////////////   FETCH ADMINS DATA   //////////////////////////////

    interface AdminsData {
      id: number;
      username: string;
      email: string;
      role: string;
      created_at: Date;
      updated_at: Date;
    }


    const [adminsData, setAdminsData] = useState<AdminsData[]>([]);


    const fetchAdmins = async () => {

      try{

      const jwtToken = localStorage.getItem('jwtToken');
      const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/users/getAdminsUsername`;

      const res = await fetch(backendUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`,
          },

      });

      const data = await res.json();

      if(res.ok){
        setAdminsData(data.usernames || []);
        console.log('Frontend: Se obtuvieron los usernames con exito.')

      } else{
        setError(data.error || 'Error desconocido al obtener la lista de admins.')
        console.error('Frontend: Error del backend al obtener usernames:', data.error);
      }

      }catch (error){
        console.error('Error al obtener los usernasmes del backend', error);
        setError("No se pudo obtener los datos de los usuarios")
      }
    };


    useEffect(() =>{
      fetchAdmins();
    },[])



  /////////////////////     ADD ADMIN        //////////////////////////


  interface AdminDataForm {
    username: string;
    email: string;
    password: string;
    role: string;
  }

  const [formDataAdd, setFormDataAdd] = useState<AdminDataForm>({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    const {name, value} = e.target;
    setFormDataAdd(prev =>  ({
      ...prev,
      [name]: value,
    }));

    setMessage('');
    setError('');
  };

  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage('');
    setError('');
    setIsLoading(true);

    if(!isValidPassword(formDataAdd.password)){
      setError('Passowrd invalido: debe tener al menos una mayuscula,numero y un caracter especial')
    }

    try {
      /*
      if (!isSuperAdmin){
        setError("Solo los Super admins pueden crear admins.");
        setIsLoading(false);
        return;
      }
      */
      const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/users/add-admin`;
      const jwtToken = localStorage.getItem('jwtToken');
      /*
      if (!jwtToken){
        setError("No estas autenticado. Por favor, inicia sesion.");
        setIsLoading(false);
        return;
      }
      */
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(formDataAdd),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Admin creado con exito!.")
        fetchAdmins();
        setFormDataAdd({
          username: "",
          email: "",
          password: "",
          role: "",
        })
      } else {
        setError(data.error || "Ocurrio un error desconocido al crear el admin.");
      }

    } catch (error) {
      console.error("Error al conectar con el backend o procesar la respuesta:", error);
      setError("No se pudo conectar con el servidor. Verifica que el backend esté funcionando y accesible.");
    } finally {
      setIsLoading(false);
    }
  };





  //////////////////////////      DELETE ADMIN         ///////////////////////////


    const [formDataDelete, setFormDataDelete] = useState({
      id: '',
    })


    const handleChangeDelete = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const {name, value} = e.target
      setFormDataDelete(prev => ({
        ...prev,
        [name]: value,
      }))
    }


    const handleSubmitDelete = async (e: React.FormEvent<HTMLFormElement>) => {

      e.preventDefault();

      const idToDelete = parseInt(formDataDelete.id)

      try {

        const jwtToken = localStorage.getItem('jwtToken');
        const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/users/deleteAdmin`;

        const res = await fetch(backendUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`,
          },
          body: JSON.stringify( { id: idToDelete })
        });

        const data = await res.json();

        if (res.ok) {
          console.log(`Admin eliminado con exito.`);
          setFormDataDelete({id: ''});
          await fetchAdmins();
        } else {
          setError(data.error || `Error desconocido al eliminar admin`);
        }

      } catch (err){
        console.error('Error al eliminar', err);
        setError('Error de servidor no se pudo eliminar al admin.')
      }

    };



  return (

    <div className="min-h-screen bg-gray-100 p-6">
  {/* Encabezado */}
  <div className="mb-8 text-center">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Administradores</h1>
    <div className="border-b-2 border-red-600 w-20 mx-auto"></div>
  </div>

  <div className="flex flex-col lg:flex-row gap-6 w-full justify-center">
    {/* Formulario Añadir Admin */}
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full lg:w-1/3 max-w-lg">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 border-b border-gray-200 pb-2">
        <span className="text-red-600">Crear</span> Administrador
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Usuario:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formDataAdd.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
            minLength={4}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formDataAdd.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña:</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formDataAdd.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-12"
              required
            />
            <button
              type="button"
              onClick={tooglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600 hover:text-red-600"
              disabled={isLoading}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Rol:</label>
          <select
            id="role"
            name="role"
            value={formDataAdd.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          >
            <option value="">- Seleccionar -</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition disabled:bg-red-400"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creando...
            </span>
          ) : 'Crear Admin'}
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-600 text-green-800 rounded-md">
          {message}
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-600 text-red-800 rounded-md">
          {error}
        </div>
      )}
    </div>

    {/* Formulario Eliminar Admin */}
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full lg:w-1/4 max-w-xs">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 border-b border-gray-200 pb-2">
        <span className="text-red-600">Eliminar</span> Administrador
      </h2>
      <form onSubmit={handleSubmitDelete} className="space-y-4">
        <div>
          <label htmlFor="select" className="block text-sm font-medium text-gray-700 mb-1">Seleccionar:</label>
          <select
            name="id"
            id="select"
            value={formDataDelete.id}
            onChange={handleChangeDelete}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value=''>- Seleccionar -</option>
            {adminsData.map((admin) => (
              <option key={admin.id} value={admin.id}>{admin.username}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-black text-white py-2 px-4 rounded-md font-medium transition"
        >
          Eliminar
        </button>
      </form>
    </div>

    {/* Tabla de Administradores */}
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full lg:w-2/5">
      {adminsData.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-gray-700">No hay administradores registrados</h3>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 border-b border-gray-200 pb-2">
            <span className="text-red-600">Listado</span> de Administradores
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">Usuario</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">Rol</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">Creado</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300">Actualizado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adminsData.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{admin.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">{admin.username}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{admin.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{admin.created_at.toLocaleString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{admin.updated_at.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  </div>
</div>
  );

}


export default Admins;
