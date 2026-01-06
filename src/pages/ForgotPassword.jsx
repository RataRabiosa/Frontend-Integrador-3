import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserAuth } from '../store/userAuth'
import { useForm } from "react-hook-form"

const ForgotPassword = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const { token, setToken } = UserAuth();
    const [isError, setIsError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = data => {

        // Enviar POST al backend para recuperar la contraseña
        const userForgotPassword = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });

                // Si es existoso, redirigiar al home y guardar el token
                if (response.status === 200) {
                    setIsError({"success": true, msg:"Revisa tu bandeja de entrada."});
                    //navigate('/');

                // Si hay un error, mostrar mensaje de error
                } else {
                const errorData = await response.json();
                setIsError({"success": false, msg: errorData.message || 'Hubo un error en el servidor. Por favor, intente nuevamente.'});
                //setIsError(errorData.message || 'Hubo un error en el servidor. Por favor, intente nuevamente.');
                //navigate('/forgot-password');
                }

            // Si hay un error, mostrar mensaje de error y redirigir al registro
            } catch (error) {
                setIsError({"success": false, msg: error.message || 'Hubo un error en el servidor. Por favor, intente nuevamente.'});
                //navigate('/forgot-password');
            }
        };

        userForgotPassword();
    };

  return (
      <>
        <div className="flex justify-center items-center mt-10 px-4">
          <div className="text-center">
              {
                  // Mostrar error si falla el request
                  isError?.success === true ? (
                      <div className="alert alert-success mb-4">
                          {isError.msg}
                      </div>
                  ) : isError?.success === false ?(
                      <div className="alert alert-error mb-4">
                          {isError.msg}
                      </div>
                  ) : token ? (navigate('/')) : null
              }
              <form onSubmit={handleSubmit(onSubmit)} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

                  <fieldset className="fieldset">
                      <label className="label">Email</label>
                      <input 
                        type="email" 
                        className={`input ${errors.email ? 'input-error' : ''}`} 
                        placeholder="Email" 
                        {...register("email", { required: "El email es requerido" })} 
                      />
                      {errors.email && <p className="text-error text-sm text-left">{errors.email.message}</p>}
                  </fieldset>
                  <button className="btn btn-neutral mt-4 w-full" type="submit">Recuperar contraseña</button>
              </form>
              <p className="mt-4">¿No tienes cuenta? - Regístrate <b><NavLink to="/register">aquí</NavLink></b></p>
              <p>¿Ya eres cliente? <b><NavLink to="/login">Iniciar sesión</NavLink></b></p>
          </div>
      </div>
      </>
    )
}

export default ForgotPassword