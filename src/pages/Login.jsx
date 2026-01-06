import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserAuth } from '../store/userAuth'
import { useForm } from "react-hook-form"

const Login = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const { token, setToken } = UserAuth();
    const [isLoginError, setIsLoginError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = data => {

        // Enviar POST al backend para registrar el usuario
        const userLogin = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });

                // Si es existoso, redirigiar al home y guardar el token
                if (response.status === 200) {
                    const token = await response.json();
                    setToken(token.data.access_token);
                    navigate('/');

                // Si hay un error, mostrar mensaje de error y redirigir al registro
                } else {
                const errorData = await response.json();
                //console.error('Error al registrar el usuario:', errorData.message);
                setIsLoginError(errorData.message || 'Error al registrar el usuario. Por favor, intente nuevamente.');
                navigate('/login');
                }

            // Si hay un error, mostrar mensaje de error y redirigir al registro
            } catch (error) {
                setIsLoginError(error.message || 'Error al registrar el usuario. Por favor, intente nuevamente.');
                //console.error('Error al registrar el usuario:', error);
                navigate('/login');
            }
        };

        userLogin();
    };

  return (
      <>
        {token ? (navigate('/')) : null}
        <div className="flex justify-center items-center mt-10">
          <div className="text-center">
              {
                  // Mostrar error si falla el registro
                  isLoginError ? (
                      <div className="alert alert-error mb-4">
                          {isLoginError}
                      </div>
                  ) : null
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
  
                  <fieldset className="fieldset">
                      <label className="label">Contraseña</label>
                      <input 
                        type="password" 
                        className={`input ${errors.password ? 'input-error' : ''}`} 
                        placeholder="Contraseña" 
                        {...register("password", {
                            required: "La contraseña es requerida.",
                            minLength: { value: 6, message: "Mínimo 6 caracteres." }
                        })} />
                      {errors.password && <p className="text-error text-sm text-left">{errors.password.message}</p>}
                  </fieldset>
  
                  <button className="btn btn-neutral mt-4 w-full" type="submit">Iniciar sesión</button>
              </form>
              <p className="mt-4">¿No tienes cuenta? - Regístrate <b><NavLink to="/register">aquí</NavLink></b></p>
              <NavLink to="/forgot-password"><p>Olvide mi contraseña</p></NavLink>
          </div>
      </div>
      </>
    )
}

export default Login