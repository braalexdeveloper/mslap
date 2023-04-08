import React from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Sidebar } from "../Sidebar";
import useMenuToggle from '../../hooks/useMenuToggle';

export const Projects = () => {
  const {menu} = useMenuToggle();
  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main" style={{  marginLeft: menu ? '': '0px' }}>
        <section className="section dashboard">
          <div className="pagetitle">
            <h1>Projects</h1>
            <nav>
              <button className="btn btn-success mt-2 ">
                <i className="bi bi-plus-lg"></i> Crear Nuevo
              </button>
            </nav>
          </div>
          <section className="section">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Nombres</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">DNI</th>
                            <th scope="col">Telf. Contacto</th>
                            <th scope="col">Contacto de Emergencia</th>
                            <th scope="col">Telf. Emergencia</th>
                            <th scope="col">Email</th>
                            <th scope="col">Tipo de Sangre</th>
                            <th scope="col">Proyecto</th>
                            <th scope="col">Sueldo</th>
                            <th scope="col">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Brandon Jacob</td>
                            <td>Designer</td>
                            <td>46852154</td>
                            <td>2016-05-25</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>
                              <button className="btn btn-warning btn-sm ">
                                <i className="bi bi-pencil-fill"></i>
                              </button>
                              &nbsp;
                              <button className="btn btn-danger btn-sm ">
                                <i className="bi bi-trash-fill"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Brandon Jacob</td>
                            <td>Designer</td>
                            <td>28</td>
                            <td>2016-05-25</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>
                              <button className="btn btn-warning btn-sm ">
                                <i className="bi bi-pencil-fill"></i>
                              </button>
                              &nbsp;
                              <button className="btn btn-danger btn-sm ">
                                <i className="bi bi-trash-fill"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Brandon Jacob</td>
                            <td>Designer</td>
                            <td>28</td>
                            <td>2016-05-25</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>
                              <button className="btn btn-warning btn-sm ">
                                <i className="bi bi-pencil-fill"></i>
                              </button>
                              &nbsp;
                              <button className="btn btn-danger btn-sm ">
                                <i className="bi bi-trash-fill"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Brandon Jacob</td>
                            <td>Designer</td>
                            <td>28</td>
                            <td>2016-05-25</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>
                              <button className="btn btn-warning btn-sm ">
                                <i className="bi bi-pencil-fill"></i>
                              </button>
                              &nbsp;
                              <button className="btn btn-danger btn-sm ">
                                <i className="bi bi-trash-fill"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Brandon Jacob</td>
                            <td>Designer</td>
                            <td>28</td>
                            <td>2016-05-25</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>Designer</td>
                            <td>
                              <button className="btn btn-warning btn-sm ">
                                <i className="bi bi-pencil-fill"></i>
                              </button>
                              &nbsp;
                              <button className="btn btn-danger btn-sm ">
                                <i className="bi bi-trash-fill"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};
