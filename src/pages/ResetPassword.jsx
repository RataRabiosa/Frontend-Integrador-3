import React, { useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { UserAuth } from '../store/userAuth'
import { useForm } from "react-hook-form"

const ResetPassword = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const { token, setToken } = UserAuth();
    const [isError, setIsError] = useState(null);
    const navigate = useNavigate();

    // url token
    const [searchParams] = useSearchParams();
    const urlToken = searchParams.get('token');

    const onSubmit = data => {

        // Enviar POST al backend para registrar el usuario
        const userResetPassword = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/reset-password?token=${urlToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });

                // Si es existoso, redirigiar al home y guardar el token
                if (response.status === 200) {
                    setIsError({"success": true, msg:"Contraseña restablecida con éxito. Redirigiendo..."});
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    navigate('/login');

                // Si hay un error, mostrar mensaje de error y redirigir al registro
                } else {
                const errorData = await response.json();
                //console.error('Error al registrar el usuario:', errorData.message);
                setIsError({ "success": false, msg: errorData.message || 'Error al recuperar la contraseña. Por favor, intente nuevamente.' });
                //navigate('/login');
                }

            // Si hay un error, mostrar mensaje de error y redirigir al registro
            } catch (error) {
                setIsError({ "success": false, msg: error.message || 'Error al registrar el usuario. Por favor, intente nuevamente.' });
                //console.error('Error al registrar el usuario:', error);
                //navigate('/login');
            }
        };

        userResetPassword();
    };

  return (
      <>
        <div className="flex justify-center items-center mt-10">
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
                  ) : !urlToken ? (
                    navigate('/')) : null
              }
              <form onSubmit={handleSubmit(onSubmit)} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  
                  <fieldset className="fieldset">
                    <label className="label">Contraseña</label>
                    <input 
                      type="password" 
                      className={`input ${errors.newPassword ? 'input-error' : ''}`} 
                      placeholder="Contraseña" 
                      {...register("newPassword", {
                          required: "La contraseña es requerida.",
                          minLength: { value: 6, message: "Mínimo 6 caracteres." }
                      })} />
                    {errors.newPassword && <p className="text-error text-sm text-left">{errors.newPassword.message}</p>}
                </fieldset>

                <fieldset className="fieldset">
                    <label className="label">Confirmar Contraseña</label>
                    <input 
                      type="password" 
                      className={`input ${errors.confirmNewPassword ? 'input-error' : ''}`} 
                      placeholder="Confirmar Contraseña" 
                      {...register("confirmNewPassword", {
                          required: "Confirme su contraseña",
                          validate: value => value === getValues("newPassword") || "Las contraseñas no coinciden"
                      })} />
                    {errors.confirmNewPassword && <p className="text-error text-sm text-left">{errors.confirmNewPassword.message}</p>}
                </fieldset>

                <button className="btn btn-neutral mt-4 w-full" type="submit">Restablecer Contraseña</button>
            </form>
            <p className="mt-4">¿No tienes cuenta? - Regístrate <b><NavLink to="/register">aquí</NavLink></b></p>
            <p>¿Ya eres cliente? - Inicia sesión <b><NavLink to="/login">aquí</NavLink></b></p>
        </div>
    </div>
    </>
)
}

export default ResetPassword