import React from 'react';
import useMenuToggle from '../../hooks/useMenuToggle';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Sidebar } from '../Sidebar';

export const Operarios = () => {
    const {menu}=useMenuToggle();
    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main" style={{  marginLeft: menu ? '': '0px' }}>

                <section className="section dashboard">
                    <div className="pagetitle">
                        <h1>Operarios</h1>
                        <nav>

<button className='btn btn-success mt-2 ' data-bs-toggle="modal" data-bs-target="#verticalycentered">
    <i className="bi bi-plus-lg"></i> Crear Nuevo
</button>
<div className="modal fade" id="verticalycentered" tabindex="-1">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Agregar Operario</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

            </div>
            <div className="modal-body">

                <form className="row g-3">
                    <div className="col-12">
                        <label for="inputNanme4" className="form-label">DNI</label>
                        <input type="text" className="form-control" id="inputNanme4" />
                    </div>

                    <div className="col-12">
                        <label for="inputNanme4" className="form-label">Name</label>
                        <input type="text" className="form-control" id="inputNanme4" />
                    </div>

                    <div className="col-12">
                        <label for="inputNanme4" className="form-label">Apellidos</label>
                        <input type="text" className="form-control" id="inputNanme4" />
                    </div>


                    <div className="col-12">
                        <label for="inputNanme4" className="form-label">Fecha de Nacimiento</label>
                        <input type="date" className="form-control" id="inputNanme4" />
                    </div>


                    <div className="col-12">
                        <label for="inputNanme4" className="form-label">Telefono</label>
                        <input type="text" className="form-control" id="inputNanme4" />
                    </div>


                    <div className="col-12">
                        <label for="inputNanme4" className="form-label">Contacto de Emergencia</label>
                        <input type="text" className="form-control" id="inputNanme4" />
                    </div>

                    <div className="col-12">
                        <label for="inputNanme4" className="form-label">Telf. de Emergencia</label>
                        <input type="text" className="form-control" id="inputNanme4" />
                    </div>

                    <div className="col-12">
                        <label for="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" />
                    </div>

                    <div className="col-12">
                        <label for="inputAddress" className="form-label">Tipo de Sangre</label>
                        <input type="text" className="form-control" id="inputAddress" />
                    </div>

                    <div className="col-12">
                        <label for="inputAddress" className="form-label">Salario</label>
                        <input type="number" className="form-control" id="inputAddress" />
                    </div>

                    <div className="col-12">
                        <label for="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" />
                    </div>

                    <div className="col-12">
                        <label for="inputPassword4" className="form-label">Cargo</label>
                        <select className="form-control">
                        <option>escoge</option>
                        <option>escoge2</option>
                        <option>escoge3</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <label for="inputPassword4" className="form-label">Proyecto</label>
                        <select className="form-control">
                            <option>escoge</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <label for="inputAddress" className="form-label">Certificados</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                    </div>
                    <div className="col-12">
                        <label for="inputNanme4" className="form-label">Observación</label>
                        <textarea className="form-control"></textarea>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-success">Guardar</button>
                        <button type="reset" className="btn btn-warning mx-2">Reset</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>

                </form>
            </div>

        </div>
    </div>
</div>
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
                                                            <button className='btn btn-warning btn-sm '><i className="bi bi-pencil-fill"></i></button>&nbsp;
                                                            <button className='btn btn-danger btn-sm '><i className="bi bi-trash-fill"></i></button>
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
                                                            <button className='btn btn-warning btn-sm '><i className="bi bi-pencil-fill"></i></button>&nbsp;
                                                            <button className='btn btn-danger btn-sm '><i className="bi bi-trash-fill"></i></button>
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
                                                            <button className='btn btn-warning btn-sm '><i className="bi bi-pencil-fill"></i></button>&nbsp;
                                                            <button className='btn btn-danger btn-sm '><i className="bi bi-trash-fill"></i></button>
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
                                                            <button className='btn btn-warning btn-sm '><i className="bi bi-pencil-fill"></i></button>&nbsp;
                                                            <button className='btn btn-danger btn-sm '><i className="bi bi-trash-fill"></i></button>
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
                                                            <button className='btn btn-warning btn-sm '><i className="bi bi-pencil-fill"></i></button>&nbsp;
                                                            <button className='btn btn-danger btn-sm '><i className="bi bi-trash-fill"></i></button>
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
    )
}
