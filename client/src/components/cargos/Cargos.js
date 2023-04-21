
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import useMenuToggle from '../../hooks/useMenuToggle';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Sidebar } from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { AllCargos, createCargo, deleteCargo, updateCargo } from '../../redux/actions';
import { Form } from './Form';


export const Cargos = () => {
    const { menu } = useMenuToggle();
    const dispatch = useDispatch();
    const cargos = useSelector(state => state.cargos);


    const [input, setInput] = useState({ name: '' });
    const [action, setAction] = useState("create");


    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

    }

    const limpiarCampo = () => {
        setInput({ name: '' });
        setAction("create");
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (action === "create") {
            dispatch(createCargo(input));
           
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Creado Correctamente!',
                showConfirmButton: false,
                timer: 2000
            })
        } else {
            dispatch(updateCargo(input.id, input));
           

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Actualizado Correctamente',
                showConfirmButton: false,
                timer: 2000
            })
        }
        limpiarCampo();
        dispatch(AllCargos());
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estas seguro de eliminar?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCargo(id));
                Swal.fire(
                    'Eliminado!',
                    'Cargo eliminado con éxito.',
                    'success'
                )
            }
        })

    }

    const showCargo = async (id) => {
        const response = await axios.get('http://localhost:3001/api/admin/position/' + id);
        setInput(response.data.data);
        setAction("edit");
    }

    useEffect(() => {
        dispatch(AllCargos());

    }, [dispatch]);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main" style={{ marginLeft: menu ? '' : '0px' }}>
                <section className="section dashboard">
                    <div className="pagetitle">
                        <h1>Cargos</h1>
                        <nav>
                            <button className='btn btn-success mt-2 ' data-bs-toggle="modal" data-bs-target="#verticalycentered" onClick={() => limpiarCampo()}>
                                <i className="bi bi-plus-lg"></i> Crear Nuevo
                            </button>

                            <Form handleSubmit={handleSubmit} handleChange={handleChange} input={input} action={action} />

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
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cargos && cargos.map((el, index) => (
                                                        <tr key={index}>
                                                            <td>{el.name}</td>
                                                            <td>
                                                                <button data-bs-toggle="modal" data-bs-target="#verticalycentered" className='btn btn-warning btn-sm ' onClick={() => showCargo(el.id)} ><i className="bi bi-pencil-fill"></i></button>&nbsp;
                                                                <button className='btn btn-danger btn-sm ' onClick={() => handleDelete(el.id)}><i className="bi bi-trash-fill"></i></button>
                                                            </td>
                                                        </tr>
                                                    ))}

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
