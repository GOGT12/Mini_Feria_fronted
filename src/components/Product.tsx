
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


interface ProductProps {
  id: number;
  name: string;
  price: number;
  url: string;
  stock: number;
}

const deleteProduct = async (
  id: number
) => {

  try{

    console.log(id)
    const jwtToken = localStorage.getItem('jwtToken');
    const backendUrl = `http://localhost:3000/api/products/delete-product/${id}`;
    const res = await fetch(backendUrl, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      },
    });

    const data = await res.json();

    if (res.ok){
      console.log(`Se elimino el producto con el id ${id}.`);

    }else{
      console.error(`Frontend: Hubo un error al eliminar el producto con el id ${id}.`)
    }
  }catch(err){
    console.error('Hubo un error al conectarse con el servidor', err);
  }
}





const Product = ({ id, name, price, url, }: ProductProps) => {

  const {user} = useAuth();
  const isAdmin = user && user.role === 'admin' || user && user.role === 'super_admin'

  return (

    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 relative">

      {isAdmin ? (
        <button
          type="button"
          className="bg-red-600 text-white text-xs p-1 font-bold rounded-md absolute right-0 z-10 "
          onClick={() => deleteProduct(id)}
        >Eliminar
        </button>
      ):('')}

      {/* Imagen del producto */}
      <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
        <img
          src={url}
          alt={name}
          className="max-h-full max-w-full object-contain"
        />

      </div>



      {/* Detalles del producto */}
      <div className="p-2">
        <Link to={`/product/${id}`}>
          {/* Nombre del producto */}
          <h3 className="text-sm font-semibold text-gray-800 overflow-y-auto h-16 mb-2">
            {name}
          </h3>

          {/* Precio */}
          <div className="flex items-center mb-2">
            <span className="text-xl font-bold text-red-600">${price}</span>
          </div>

          {/* Botón */}
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded-lg font-medium transition-colors duration-300">
            Añadir al carrito
          </button>
        </Link>
      </div>

    </div>
  );
};

export { type ProductProps, Product };
