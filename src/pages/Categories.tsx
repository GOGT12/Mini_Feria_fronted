import type React from "react";
import { useState, useEffect } from "react";


interface Category{
  id: number,
  name: string,
  description: string,
  parent_id: number | null,
  created_at: Date,
  updated_at: Date,
}

interface AddDataForm{
  parent_id?: number | undefined,
  name: string,
  description?: string,
}

interface DeleteForm{
  id: number | undefined
}

function Categories(){

  const [categories, setCategories] = useState<Category[]>([]);

  const [addFormData, setaddFormData] = useState<AddDataForm>({
    parent_id: undefined,
    name: '',
    description: '',
  });

  const [deleteFormData, setDeleteFormData] = useState<DeleteForm>({
    id: undefined
  })


  ///////////////////      FETCH CATEGORIES          //////////////////

  const fetchCategories = async () =>{
    try {

      const backendUrl ='http://localhost:3000/api/categories/get-categories';
      const jwtToken = localStorage.getItem('jwtToken');

      if(!jwtToken){
        console.error('No estas autenticado inicia sesion')
        return
      }

      const res = await fetch(backendUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        },
      });

      const data  = await res.json();

      if (res.ok){
        setCategories(data.categories || []);
        console.log('Categorias cargadas con exito.', data.categories);
      }else {
        console.log('Fronted: Error del backend al obtener las categorias', data.error);
      }
    }catch(err){
      console.error('Frontend: Hubo un error de red o conexión al obtener las categorías:', err);

    }
  };

  useEffect(() =>{
    fetchCategories();
  },[])



  //////////////////////         ADD CATEGORY        ////////////////////

  const handleChangeAdd = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>) => {
    const {name, value} = e.target;
    setaddFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {
      const backendUrl ='http://localhost:3000/api/categories/add-category';
      const jwtToken = localStorage.getItem('jwtToken');

      const res = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        },
        body: JSON.stringify(addFormData),
      });

      const data = await res.json();

      if (res.ok) {
        setaddFormData({
          parent_id: undefined,
          name: '',
          description: ''
        })
        fetchCategories();
      } else {
        console.log('Hubo un error al crear la categoria.')
      }
    } catch(error){
      console.error('Error al conectar con el backend', error);
    }

  }

  ////////////////////       DELETE CATEGORY       ////////////////////////

  const handleChangeDelete = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;

    setDeleteFormData(prev => ({
      ...prev,
      [name]: parseInt(value),
    }))

  }
  const handleSubmitDelete = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{

      const backendUrl = 'http://localhost:3000/api/categories/delete-category';
      const jwtToken = localStorage.getItem('jwtToken');

      const res = await fetch(backendUrl,{
        method: "DELETE",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        },
        body: JSON.stringify(deleteFormData),
      });

      const data = await res.json()

      if (res.ok){
        console.log('se elimino la categoria con exito')
        setDeleteFormData({
          id: undefined
        })
        fetchCategories();
      }
    }catch(error){
      console.error('Hubo un error en el servidor', error);
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 p-6">
  {/* Encabezado */}
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-2">Administración de Categorías</h1>
    <p className="text-gray-600">Gestiona las categorías de tu tienda</p>
  </div>

  <div className="flex flex-col lg:flex-row gap-8">
    {/* Sección izquierda - Formularios */}
    <div className="w-full lg:w-1/3 space-y-6">
      {/* Añadir Categoría */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Añadir Categoría
        </h2>
        <form onSubmit={handleSubmitAdd} className="space-y-4">
          <div>
            <label htmlFor="parentCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría Padre
            </label>
            <select
              name="parent_id"
              id="parentCategory"
              value={addFormData.parent_id}
              onChange={handleChangeAdd}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            >
              <option value={undefined}>Ninguna (categoría raíz)</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="addCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Categoría
            </label>
            <input
              type="text"
              id="addCategory"
              name="name"
              value={addFormData.name}
              onChange={handleChangeAdd}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              placeholder="Ej: Electrónica"
            />
          </div>

          <div>
            <label htmlFor="addCategoryDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              id="addCategoryDescription"
              value={addFormData.description}
              onChange={handleChangeAdd}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              placeholder="Breve descripción de la categoría"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition flex justify-center items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Crear Categoría
          </button>
        </form>
      </div>

      {/* Eliminar Categoría */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          Eliminar Categoría
        </h2>
        <form onSubmit={handleSubmitDelete} className="space-y-4">
          <div>
            <label htmlFor="deleteCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Seleccionar Categoría
            </label>
            <select
              name="id"
              id="deleteCategory"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              value={deleteFormData.id}
              onChange={handleChangeDelete}
            >
              <option value={undefined}>Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg font-medium transition flex justify-center items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Eliminar Categoría
          </button>
        </form>
      </div>
    </div>

    {/* Sección derecha - Tabla de categorías */}
    <div className="w-full lg:w-2/3">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Listado de Categorías
          </h2>
          <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
            Total: {categories.length}
          </span>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-700">No hay categorías registradas</h3>
            <p className="mt-1 text-gray-500">Comienza añadiendo una nueva categoría</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Padre (ID)</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creado</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actualizado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{category.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{category.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.parent_id || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(category.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(category.updated_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  )
}


export default Categories;
