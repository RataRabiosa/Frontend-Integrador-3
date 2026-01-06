import React, { useEffect, useState } from 'react'
import { CartStorage } from '../store/userCartStorage.js'
import Cards from '../components/Cards.jsx'
import manageDrawer from '../components/manageDrawerState.js';

const Products = () => {

  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { checked, toggle } = manageDrawer();
  const { totalCartItems, addToCart } = CartStorage();

  const updateCart = (id, name, price, quantity, image) => {
    
    addToCart({ id, name, price, quantity, image });
    toggle();
  }
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Esperar 1 segundos para simular carga
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/product`);
        if (!resp.ok) {
          throw new Error(`Error al obtener productos - status: ${resp.status}`);
        }
        const json = await resp.json();
        setProductList(json.data);
      } catch (err) {
        setError("Error al obtener productos. Por favor, intente nuevamente más tarde.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
    // Mostrar icono de carga mientras se obtienen los productos
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  // Mostrar error si falla la carga
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <>
      <div className="menu menu-vertical lg:menu-horizontal">
        {productList.map(item => (
        <Cards
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          image={item.image}
          stock={item.stock}
          onClick={updateCart}
        />
      ))}
      </div>
    </>
  )
}

export default Products