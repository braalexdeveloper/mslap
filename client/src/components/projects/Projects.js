import React, { useEffect, useState } from "react";
import useMenuToggle from "../../hooks/useMenuToggle";
import axios from "axios";
import Swal from "sweetalert2";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Sidebar } from "../Sidebar";
//import { userSelector } from "../../slices/user/userSlice";
import {
  getAllProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../../slices/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "./Form";
import { url_api } from "../../utils/config";

function validate(input) {
  let errors = {};
  const pattern = new RegExp("^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$");
  if (input.name === "") {
    errors.name = "El campo nombre es requerido";
  } else if (!pattern.test(input.name)) {
    errors.name = "No se aceptan números";
  }

  if (!input.dateStart) {
    errors.dateStart = "La fecha de inicio es obligatorio";
  } else if (!input.dateEnd) {
    errors.dateEnd = "La fecha de finalización es obligatorio";
  } else if (!input.totalCertificates || input.totalCertificates < 1) {
    errors.totalCertificates = "Este campo no acepta valores menor a 1";
  } else if (!input.location) {
    errors.location = "Este campo es obligatorio";
  }

  return errors;
}

export const Projects = () => {
  const { menu } = useMenuToggle();
  const [action, setAction] = useState("create");
  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  //const { user } = useSelector(userSelector);
  const [input, setInput] = useState({
    name: "",
    dateStart: "",
    dateEnd: "",
    totalCertificates: 0,
    location: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const limpiarCampo = () => {
    setInput({
      name: "",
      dateStart: "",
      dateEnd: "",
      totalCertificates: 0,
      location: "",
    });
    setAction("create");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === "create") {
      dispatch(createProject(input));

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Project Creado Correctamente!",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      dispatch(updateProject(input.id, input));

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Actualizado Correctamente",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    limpiarCampo();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProject(id));

        Swal.fire("Eliminado!", "Project eliminado con éxito.", "success");
      }
    });
  };

  const showProject = async (id) => {
    const response = await axios.get(`${url_api}/api/admin/project/${id}`);

    let fechaStart = response.data.data.dateStart.split("T");
    let fechaEnd = response.data.data.dateEnd.split("T");

    setInput({
      id: response.data.data.id,
      name: response.data.data.name,
      dateStart: fechaStart[0],
      dateEnd: fechaEnd[0],
      totalCertificates: response.data.data.totalCertificates,
      location: response.data.data.location,
    });
    setAction("edit");
    setErrors({});
  };

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Sidebar />
      <main
        id="main"
        className="main"
        style={{ marginLeft: menu ? "" : "0px" }}
      >
        {/*user.role.value && user.role.value!=="admin" ? <h1>No tienes acceso</h1> :*/}
        <section className="section dashboard">
          <div className="pagetitle">
            <h1>Projects</h1>
            <nav>
              <button
                className="btn btn-success mt-2 "
                data-bs-toggle="modal"
                data-bs-target="#verticalycentered"
                onClick={() => limpiarCampo()}
              >
                <i className="bi bi-plus-lg"></i> Crear Nuevo
              </button>
              <Form
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                input={input}
                action={action}
                errors={errors}
              />
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
                            <th scope="col">Fecha Inicio</th>
                            <th scope="col">Fecha Finalización</th>
                            <th scope="col">N° Certificados</th>
                            <th scope="col">Ubicación</th>
                            <th scope="col" colSpan={2}>
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects &&
                            projects.map((el, index) => (
                              <tr key={index}>
                                <td>{el.name}</td>
                                <td>{el.dateStart}</td>
                                <td>{el.dateEnd}</td>
                                <td>{el.totalCertificates}</td>
                                <td>
                                  <a
                                    href={el.location}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="bi bi-geo-alt-fill"></i>
                                  </a>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-warning btn-sm "
                                    data-bs-toggle="modal"
                                    data-bs-target="#verticalycentered"
                                    onClick={() => showProject(el.id)}
                                  >
                                    <i className="bi bi-pencil-fill"></i>
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger btn-sm "
                                    onClick={() => handleDelete(el.id)}
                                  >
                                    <i className="bi bi-trash-fill"></i>
                                  </button>
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
  );
};
