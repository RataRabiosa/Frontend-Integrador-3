import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from 'react-router-dom'
import { UserAuth } from '../store/userAuth'

const Register = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const { token, setToken } = UserAuth();
  const [isRegisterError, setIsRegisterError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = data => {
    // Enviar POST al backend para registrar el usuario
    const registerUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        // Si es existoso, redirigiar al home y guardar el token
        if (response.status === 201) {
            const token = await response.json();
            setToken(token.data.access_token);
            navigate('/');

        // Si hay un error, mostrar mensaje de error y redirigir al registro
        } else {
          const errorData = await response.json();
          //console.error('Error al registrar el usuario:', errorData.message);
          setIsRegisterError(errorData.message || 'Error al registrar el usuario. Por favor, intente nuevamente.');
          navigate('/register');
        }

     // Si hay un error, mostrar mensaje de error y redirigir al registro
      } catch (error) {
       setIsRegisterError(error.message || 'Error al registrar el usuario. Por favor, intente nuevamente.');
       //console.error('Error al registrar el usuario:', error);
       navigate('/register');
      }
    };

    registerUser();
  };

  return (
    <>
      {token ? (navigate('/')) : null}
      <div className="flex justify-center items-center mt-10">
        <div className="text-center">
            {
                // Mostrar error si falla el registro
                isRegisterError ? (
                    <div className="alert alert-error mb-4">
                        {isRegisterError}
                    </div>
                ) : null
            }
            <form onSubmit={handleSubmit(onSubmit)} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                
                <fieldset className="fieldset">
                    <label className="label">Nombre</label>
                    <input 
                      type="text" 
                      className={`input ${errors.firstName ? 'input-error' : ''}`} 
                      placeholder="Nombre" 
                      {...register("firstName", { required: "El nombre es requerido" })} 
                    />
                    {errors.firstName && <p className="text-error text-sm text-left">{errors.firstName.message}</p>}
                </fieldset>

                <fieldset className="fieldset">
                    <label className="label">Apellido</label>
                    <input 
                      type="text" 
                      className={`input ${errors.lastName ? 'input-error' : ''}`} 
                      placeholder="Apellido" 
                      {...register("lastName", { required: "El apellido es requerido" })} 
                    />
                    {errors.lastName && <p className="text-error text-sm text-left">{errors.lastName.message}</p>}
                </fieldset>

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

                <fieldset className="fieldset">
                    <label className="label">Confirmar Contraseña</label>
                    <input 
                      type="password" 
                      className={`input ${errors.confirmPassword ? 'input-error' : ''}`} 
                      placeholder="Confirmar Contraseña" 
                      {...register("confirmPassword", {
                          required: "Confirme su contraseña",
                          validate: value => value === getValues("password") || "Las contraseñas no coinciden"
                      })} />
                    {errors.confirmPassword && <p className="text-error text-sm text-left">{errors.confirmPassword.message}</p>}
                </fieldset>

                <button className="btn btn-neutral mt-4 w-full" type="submit">Registrarse</button>
            </form>
            <p className="mt-4">¿Ya eres cliente? - Inicia sesión <b><NavLink to="/login">aquí</NavLink></b></p>
        </div>
    </div>
    </>
  )
}

export default Register