import "../styles/pages.css"
import { Product } from "../components/Product"
import { useEffect, useState } from "react"


const MiniFeria = () => {

  interface Product{
    id: number;
    name: string;
    price: number;
    url: string;
    stock: number;
  }

  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = async () => {
    try{
      const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/products/get-products`;

      const res = await fetch(backendUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if(res.ok){
        console.log('Se obtuvo los productos con exito.');
        setProducts(data.products);
      }else{
        console.error('Frontend: Error del servidor hubo un error al obtener los productos.', data.error);
      }
    }catch(err){
      console.error('Fronted: Hubo un error al obtener los products.', err)
    }

  }

   useEffect(() =>{
      fetchProducts()
    },[])


    
  return(

    <main>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products ? (
          <div>
            {products.map((product) => (
              <div key={product.id} className="z-0 ">
                  <Product
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    url={product.url}
                    stock={product.stock}
                  />
              </div>
            ))}
          </div>
        ): ('')}
      </div>

    </main>

  )

}


export default MiniFeria
