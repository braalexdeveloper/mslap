import React, { useState,useEffect } from 'react';

import { Link,NavLink } from 'react-router-dom';
import useMenuToggle from '../hooks/useMenuToggle';

export const Sidebar = () => {

  const { menu,setMenu }=useMenuToggle();
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);
  //setMatches( e.matches )
  useEffect(() => {
    window.matchMedia("(min-width: 768px)").addEventListener('change', e => setMenu(false));
  }, []);


  return (
    <aside id="sidebar" className="sidebar" style={{  left: menu ? '0px': '-300px' }}>

    <ul className="sidebar-nav" id="sidebar-nav">

      <li className="nav-item">
        <NavLink   to={'/dashboard'} className="nav-link collapsed">
          <i className="bi bi-grid"></i>
          <span >Dashboard</span>
        </NavLink >
      </li>

      <li className="nav-item">
        <NavLink to={'/dashboard/projects'} className="nav-link collapsed" >
          <i className="bi bi-card-list"></i>
          <span>Proyectos</span>
        </NavLink >
      </li>

      <li className="nav-item">
        <NavLink  to={'/dashboard/cargos'} className="nav-link collapsed" >
          <i className="bi bi-diagram-2-fill"></i>
          <span>Cargos</span>
        </NavLink >
      </li>

       
      <li className="nav-item">
        <Link to={'/dashboard/contratistas'} className="nav-link collapsed" >
          <i className="bi bi-person-fill"></i>
          <span>Contratistas</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link to={'/dashboard/supervisores'} className="nav-link collapsed">
          <i className="bi bi-person-lines-fill"></i>
          <span>Supervisores</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link to={'/dashboard/operarios'} className="nav-link collapsed" >
          <i className="bi bi-people-fill"></i>
          <span>Operarios</span>
        </Link>
      </li>

     
    </ul>

  </aside>
  )
}
