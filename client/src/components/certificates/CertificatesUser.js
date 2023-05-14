import React, { useEffect, useState } from 'react';
import useMenuToggle from "../../hooks/useMenuToggle";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Sidebar } from "../Sidebar";
import { getUserById } from "../../slices/userCrudSlice/userCrudSlice";
import { updateCertificate } from "../../slices/certificate/certificateSlice";
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

export const CertificatesUser = () => {
    const { menu } = useMenuToggle();

    const { userById } = useSelector((state) => state.userCrud);

    const [input, setInput] = useState({ observation: "" })

    const params = useParams();
    const dispatch = useDispatch();

    function difference(date1, date2) {
        const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
        let day = 1000 * 60 * 60 * 24;
        return (date2utc - date1utc) / day
    }

    let dateCurrent = new Date();

    let arrayCertificates = userById.certificates.map(el => {
        let dateExpiration = new Date(el.expiration);
        dateExpiration.setMinutes(dateExpiration.getMinutes() + dateExpiration.getTimezoneOffset());
        return {
            ...el,
            daysExpiration: difference(dateCurrent, dateExpiration)
        }
    })

    const limpiar = () => {
        setInput({
            id:"",
            observation: ""
        })
       
    }
  
    const insertIdObservacion = (id) => {
        setInput({
            ...input,
            id
        })
       
    }
    
    const handleObservacion = (e) => {
        setInput({
            ...input,
            observation: e.target.value
        })
     }

    const submitObservacion = (e) => {
        e.preventDefault();
        dispatch(updateCertificate(input.id, input));
        limpiar();
    }


    useEffect(() => {
        dispatch(getUserById(params.idUser))
    }, [])

    return (
        <>
            <Header />
            <Sidebar />
            <main
                id="main"
                className="main"
                style={{ marginLeft: menu ? "" : "0px" }}
            >
                <section className="section dashboard">
                    <div className="pagetitle">
                        <h1>Certificados de {userById.name + " " + userById.lastName}</h1>

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
                                                        <th scope="col">Fecha Expiración</th>
                                                        <th scope="col">Estatus</th>
                                                        <th scope="col" >
                                                            Observación
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {arrayCertificates.map((el, index) => (
                                                        <tr key={index}>
                                                            <td><Link to={"http://localhost:3001/"+el.name} target='_blank'>{el.name}</Link></td>
                                                            <td>{el.expiration}</td>
                                                            <td><span className={"btn " + (el.daysExpiration === 0 ? "btn-danger" : el.daysExpiration <= 10 ? "btn-warning" : "btn-success") + " btn-sm "} style={{ width: 100 }}>{el.daysExpiration === 0 ? "Caducado" : el.daysExpiration <= 10 ? "Por Caducar" : el.status}</span>

                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-warning btn-sm me-2"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#agregarObservation" onClick={() => insertIdObservacion(el.id)}
                                                                >
                                                                    <i className="bi bi-plus-lg"></i>
                                                                </button>
                                                                {/*
                                                                <button
                                                                    className="btn btn-primary btn-sm"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#verticalycentered" 
                                                                >
                                                                    ver
                                                                </button>
                                                                 */}
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



                    <div className="modal fade" id="agregarObservation" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Agregar Observación</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form onSubmit={(e) => submitObservacion(e)}>
                                    <div className="modal-body">

                                        <label className='col-form-label'>Escriba la Observación</label>
                                        <textarea name='observacion' value={input.observation} onChange={(e) => handleObservacion(e)} className='form-control'></textarea>
                                    </div>{input.observation}
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => limpiar()} data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Enviar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </section>
            </main>
            <Footer />
        </>
    )
}
