import React, { useState, useEffect } from 'react'
import { UserAuth } from '../store/userAuth'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [isLoading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [isError, setIsError] = useState(null);
    const { token } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
            // Esperar 1 segundos para simular carga
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!resp.ok) {
                setIsError(`Error al obtener perfil - status: ${resp.status}`);
                throw new Error(`Error al obtener perfil - status: ${resp.status}`);
            }
            const json = await resp.json();
            setProfileData(json.message);
            } catch (err) {
                setIsError(err.message || "Error al obtener perfil. Por favor, intente nuevamente más tarde.");
            } finally {
            setLoading(false);
            }
        };

        fetchProfile();
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
            <div className="avatar mt-2 mb-8">
                <div className="w-24 rounded">
                    <img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" />
                </div>
            </div>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Mis datos</legend>

        <label className="label"><b>Nombre</b></label>
        <input type="text" className="input" value={profileData?.firstName || ''} disabled/>

        <label className="label"><b>Apellido</b></label>
        <input type="text" className="input" value={profileData?.lastName || ''} disabled/>

        <label className="label"><b>Email</b></label>
        <input type="text" className="input" value={profileData?.email || ''} disabled/>
        </fieldset>
        </div>
     </div>
    </>
  )
};

export default Profile;
