import React, { useEffect, useState } from 'react'
import { UserAuth } from '../store/userAuth'
import { useNavigate } from 'react-router-dom';


const Orders = () => {
    const [orderList, setOrderList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const { token } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            // Esperar 1 segundos para simular carga
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/order`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!resp.ok) {
              setIsError(`Error al obtener órdenes - status: ${resp.status}`);
              throw new Error(`Error al obtener órdenes - status: ${resp.status}`);
            }
            const json = await resp.json();
            setOrderList(json.data);
          } catch (err) {
                setIsError(err.message || "Error al obtener órdenes. Por favor, intente nuevamente más tarde.");
          } finally {
            setLoading(false);
          }
        };

        fetchOrders();
    }, []);

   // Mostrar icono de carga mientras se obtienen los productos
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  // Mostrar error si falla la carga
  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{isError}</p>
      </div>
    );
    
  return (
    <>
    { token ? null : (navigate('/login')) }
     <div className="flex justify-center items-center mt-10">
        <div className="text-center">
            <h2 className="mt-2 mb-4"><b>Historial de órdenes</b></h2>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Total</th>
                        <th>Fecha</th>
                    </tr>
                    </thead>
                    <tbody>
                        {orderList.map((order, index) => (
                            <tr key={order._id}>
                            <td>{order.products.map((product) => `${product.quantity}x ${product.name}`).join(", ")}</td>
                            <td>${order.totalPrice.toFixed(2)}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
};

export default Orders;