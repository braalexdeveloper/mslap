import React, { useState } from 'react';
import useMenuToggle from '../../hooks/useMenuToggle';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Sidebar } from '../Sidebar';

export const Cargos = () => {
    const { menu } = useMenuToggle();
    const [image, setImage] = useState("");
let arrayCount=[];
    function iter() {

        for (let i = 0; i < 5; i++) {
            arrayCount.push(i)
        }

    }
    iter();
    
console.log(arrayCount);
    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "twqan9ru");
        fetch("https://api.cloudinary.com/v1_1/dwmrbilbo/image/upload", {
            method: "POST",
            body: formData,
        }
        ).then(res => res.json()).catch(error => console.log(error)).then(res => console.log('Success:', res));;

    }

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main" style={{ marginLeft: menu ? '' : '0px' }}>

                <section className="section dashboard">
                    <div className="pagetitle">
                        <h1>Cargos</h1>
                        <nav>
                            <button className='btn btn-success mt-2 ' data-bs-toggle="modal" data-bs-target="#verticalycentered">
                                <i className="bi bi-plus-lg"></i> Crear Nuevo
                            </button>
                            <div class="modal fade" id="verticalycentered" tabindex="-1">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Agregar Cargo</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">

                                            <form class="row g-3" >
                                                <div class="col-12">
                                                    <label for="inputNanme4" class="form-label">Nombre</label>
                                                    <input type="text" class="form-control" id="inputNanme4" />
                                                </div>



                                                <div class="text-center">
                                                    <button type="submit" class="btn btn-success">Guardar</button>
                                                    <button type="reset" class="btn btn-warning mx-2">Reset</button>
                                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                                </div>

                                            </form>
                                           {arrayCount.map(element => {
                                             return <div class="col-12" key={element}>
                                             <label for="files" class="form-label">subir imagen</label>
                                             <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} class="form-control" id="files" />
                                             <button onClick={uploadImage} class="btn btn-warning mx-2">SubirImagen</button>
                                            </div>
                                           })}
                                                    
                                            

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
                                                        <th scope="col">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Brandon Jacob</td>
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
