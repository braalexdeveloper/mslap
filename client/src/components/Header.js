import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import useMenuToggle from "../hooks/useMenuToggle";
import { clearDataState, userSelector } from "../slices/user/userSlice";
import { url_api } from "../utils/config";

export const Header = () => {
  const { menu, setMenu } = useMenuToggle();
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const btnMenu = (value) => {
    setMenu(value);
   
  };
 
  const logout = (e) => {
    e.preventDefault();
    dispatch(clearDataState());
    navigate("/");
  }

 
   /*if(!isLogin){
     navigate("/");
   }*/
  
  
  return (
    <header
      id="header"
      className="header fixed-top d-flex justify-content-between align-items-center"
    >
      <div className="d-flex align-items-center justify-content-between">
        <Link
          to="/dashboard/projects"
          className="logo d-flex align-items-center"
        >
          <img src={logo} alt="" />
          <span className="d-none d-lg-block">MSLAPS</span>
        </Link>
        {menu ? (
          <i
            className="bi bi-list toggle-sidebar-btn"
            onClick={() => btnMenu(false)}
          ></i>
        ) : (
          <i
            className="bi bi-list toggle-sidebar-btn"
            onClick={() => btnMenu(true)}
          ></i>
        )}
      </div>
      <div className="logo text-center w-100">
        <span>PANEL DE {user?.role.value.toUpperCase()}</span>
      </div>
      <nav className="header-nav">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <Link
              className="nav-link nav-profile d-flex align-items-center pe-0"
              to="#"
              data-bs-toggle="dropdown"
            >
              <img
                src={`${url_api}/${user?.image}`}
                alt="Profile"
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {`${user?.name?.charAt(0)}. ${user?.lastName}`}
              </span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6 className="text-capitalize">{`${user?.name} ${user?.lastName}`}</h6>
                <span className="text-capitalize">{user?.role?.value}</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/dashboard/profile"
                >
                  <i className="bi bi-person"></i>
                  <span>Mi Perfil</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/dashboard/generateqr"
                >
                  <i className="bi bi-qr-code"></i>
                  <span>Generar QR</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center"
                  onClick={logout}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Cerrar Sesion</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};
