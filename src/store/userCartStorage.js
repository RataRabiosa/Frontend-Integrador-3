import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const CartStorage = create()(
    persist(
        (set, get) => ({
            cartItems: [],
            addToCart: (item) => {
                const existingItem = get().cartItems.find(cartItem => cartItem.id === item.id);
                if (existingItem) {
                    // Si el artículo ya está en el carrito, aumentar la cantidad
                    set({
                        cartItems: get().cartItems.map(cartItem =>
                            cartItem.id === item.id
                                ? { ...cartItem, quantity: cartItem.quantity + item.quantity, subtotal: (cartItem.price + item.price) * item.quantity }
                                : cartItem
                        )
                    });
                } else {
                    // Si el artículo no está en el carrito, agregarlo
                    set({
                        cartItems: [...get().cartItems, { ...item, quantity: item.quantity, price: item.price, subtotal: item.price * item.quantity }]
                    });
                }
            },
            decreaseItem: (id) => {
                const existingItem = get().cartItems.find(cartItem => cartItem.id === id);
                if (existingItem && existingItem.quantity > 1) {
                    // Si el artículo está en el carrito y la cantidad es mayor que 1, disminuir la cantidad
                    set({
                        cartItems: get().cartItems.map(cartItem =>
                            cartItem.id === id
                                ? { ...cartItem, quantity: cartItem.quantity - 1, subtotal: cartItem.price * (existingItem.quantity - 1) }
                                : cartItem
                        )
                    });
                } else {
                    // Si la cantidad es 1, eliminar el artículo del carrito
                    set({
                        cartItems: get().cartItems.filter(cartItem => cartItem.id !== id)
                    });
                }
            },
            increaseItem: (id) => {
                const existingItem = get().cartItems.find(cartItem => cartItem.id === id);
                if (existingItem) {
                    // Si el artículo está en el carrito, aumentar la cantidad
                    set({
                        cartItems: get().cartItems.map(cartItem =>
                            cartItem.id === id
                                ? { ...cartItem, quantity: cartItem.quantity + 1, subtotal: cartItem.price * (existingItem.quantity + 1) }
                                : cartItem
                        )
                    });
                }
            },
            totalCartItems: () => {
                const cartItems = get().cartItems;
                let total = 0;
                if (cartItems) {
                    for (let item of cartItems) {
                        total += item.quantity;
                    }
                    return total;
                }
                
                return total;
            },
            totalCheckout: () => {
                const cartItems = get().cartItems;
                let total = 0;
                if (cartItems) {
                    for (let item of cartItems) {
                        total += item.subtotal;
                    }
                    return total;
                }
                
                return total;
            },
            removeFromCart: (id) => {
                set({
                    cartItems: get().cartItems.filter(item => item.id !== id)
                });
            },
            clearCart: () => {
                set({ cartItems: [] });
            }
        }),
        {
            name: 'cartItems', // nombre del item en el almacenamiento
            storage: createJSONStorage(() => localStorage), // usar localStorage
            partialize: (state) => ({ cartItems: state.cartItems }) // solo guardar cartItems
        }
    )
)