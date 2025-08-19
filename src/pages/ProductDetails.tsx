import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface ProductDetails {
  name: string;
  description: string;
  price: number;
  stock: number;
  image_urls: string[];
  // Agrega aquí otras propiedades que necesites
}

function ProductDetailsComponent() {
  const { id } = useParams<{ id: string }>();
  const [productData, setProductData] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (!id) {
      setError("ID de producto no proporcionado");
      setLoading(false);
      return;
    }

    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      setError("ID de producto no válido");
      setLoading(false);
      return;
    }

    getProductDetails(idNumber);
  }, [id]);

  async function getProductDetails(id: number) {
    try {
      setLoading(true);
      setError(null);

      const backendUrl = `http://localhost:3000/api/products/get-products/${id}`;
      const res = await fetch(backendUrl, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setProductData(data.data);
      if (data.data?.image_urls?.length) {
        setMainImage(data.data.image_urls[0]);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 font-bold text-xl mb-2">Error</div>
        <p className="text-gray-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-700">No se encontró el producto</div>
        <a
          href="/products"
          className="inline-block mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Ver todos los productos
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-red-600">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Inicio
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <a href="/products" className="ml-1 text-sm font-medium text-gray-700 hover:text-red-600 md:ml-2">Productos</a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{productData.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Contenedor principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          {/* Imagen principal */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 h-96 flex items-center justify-center">
            <img
              src={mainImage}
              alt={productData.name}
              className="max-h-full max-w-full object-contain transition-opacity duration-300"
              key={mainImage}
            />
          </div>

          {/* Miniaturas interactivas */}
          <div className="grid grid-cols-4 gap-2">
            {productData.image_urls.map((url, index) => (
              <button
                key={index}
                type="button"
                className={`focus:outline-none rounded-md overflow-hidden border-2 transition-all ${url === mainImage ? 'border-red-600' : 'border-gray-200 hover:border-red-400'}`}
                onClick={() => setMainImage(url)}
              >
                <img
                  src={url}
                  alt={`Vista ${index + 1}`}
                  className="h-20 w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{productData.name}</h1>

          {/* Precio y disponibilidad */}
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-red-600">${productData.price}</span>
              {productData.stock > 0 ? (
                <span className="ml-4 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {productData.stock > 10 ? 'En stock' : `Últimas ${productData.stock} unidades`}
                </span>
              ) : (
                <span className="ml-4 text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  Agotado
                </span>
              )}
            </div>
            {productData.stock > 0 && (
              <p className="text-green-600 text-sm">✓ Disponible para envío inmediato</p>
            )}
          </div>

          {/* Descripción */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold mb-2">Descripción</h2>
            <p className="text-gray-700 whitespace-pre-line">{productData.description}</p>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-medium ${productData.stock > 0
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'} transition-colors`}
              disabled={productData.stock <= 0}
            >
              {productData.stock > 0 ? 'Añadir al carrito' : 'No disponible'}
            </button>
            <button
              className="flex-1 py-3 px-6 border-2 border-black rounded-lg font-medium hover:bg-gray-50 transition-colors"
              disabled={productData.stock <= 0}
            >
              Comprar ahora
            </button>
          </div>

          {/* Información de envío */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>
                <p className="font-medium">Envío gratuito</p>
                <p className="text-sm text-gray-500">Recíbelo en 2-3 días hábiles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detalles adicionales */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold mb-6">Detalles del producto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3 text-lg">Características principales</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Material premium de alta durabilidad</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Garantía del fabricante de 1 año</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Diseño ergonómico y funcional</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-lg">Especificaciones técnicas</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">Las especificaciones completas estarán disponibles pronto.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsComponent;
