import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Manejar token de autenticación del usuario
export const UserAuth = create()(
    persist(
        (set) => ({
            token: null,
            setToken: (newToken) => set({ token: newToken }),
            clearToken: () => set({ token: null }),
        }),
        {
            name: 'access_token', // nombre del item en el almacenamiento
            storage: createJSONStorage(() => localStorage), // usar localStorage
        }
    )
)