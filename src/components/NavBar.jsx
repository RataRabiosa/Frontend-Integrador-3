import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import CartDrawer from './CartDrawer.jsx';
import { CartStorage } from '../store/userCartStorage.js';
import manageDrawer from './manageDrawerState.js';
import { UserAuth } from '../store/userAuth.js';

const NavBar = () => {

  // desestructurar CartStorage
  const { totalCartItems } = CartStorage();

  // desestructurar manageDrawer
  const { checked, toggle } = manageDrawer();

  // desestructurar UserAuth
  const { token, setToken, clearToken } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        {/* ---- Start navbar menu ----*/}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><NavLink to="/">Inicio</NavLink></li>
            <li><NavLink to="/products">Productos</NavLink></li>
            <li><NavLink to="#" onClick={toggle}>Carrito</NavLink></li>
            <li><NavLink to="/about">Acerca de</NavLink></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">MercadoPreso</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/products">Productos</NavLink></li>
          <li><NavLink to="#" onClick={toggle}>Carrito</NavLink></li>
          <li><NavLink to="/about">Acerca de</NavLink></li>
        </ul>
      </div>
      {/* ---- End navbar menu ----*/}
      <div className="navbar-end">
        {/* ---- Start Cart sidebar ----*/}
        <div className="dropdown dropdown-end drawer-end" id="test">
          <input id="my-drawer-5" type="checkbox" className="drawer-toggle"  checked={checked} onChange={toggle} />
          <div className="drawer-content">
            <label htmlFor="my-drawer-5" className="drawer-button">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                    <span className="badge badge-sm indicator-item">{totalCartItems()}</span>
                </div>
              </div>
            </label>
          </div>
          <div className="drawer-side">
              <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay"></label>
              {/* Pasar state del drawer al componente */}
              <CartDrawer />
          </div>
        </div>
        {/* ---- End Cart sidebar ----*/}
        {/* ---- Start User Dropdown ----*/}
        {
          token ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Foto de perfil"
                    src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <NavLink to="/profile" className="justify-between">
                    Perfil
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/orders" className="justify-between">
                    Mis órdenes
                  </NavLink>
                </li>
                <li><a onClick={handleLogout}>Cerrar sesión</a></li>
              </ul>
            </div>
          ) : 
          (
            <NavLink to="/login" className="ml-2 mr-2">Iniciar sesión</NavLink>
          )
        }
        
        {/* ---- End Cart Dropdown ----*/}
      </div>
    </div>
  )
}

export default NavBar