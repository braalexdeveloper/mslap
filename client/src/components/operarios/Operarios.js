import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useMenuToggle from "../../hooks/useMenuToggle";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Sidebar } from "../Sidebar";
import { Form } from "../formUsuarios/Form";
import { DetailOperario } from "./DetailOperario";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../slices/userCrudSlice/userCrudSlice";
import { getAllProjects } from "../../slices/project/projectSlice";
import { getAllCargos } from "../../slices/cargo/cargoSlice";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../slices/user/userSlice";
import { validate } from "../formUsuarios/Validate";
import { Pagination } from "../pagination/Pagination";

const newOperator = {
  dni: "",
  name: "",
  lastName: "",
  birthday: "",
  phone: "",
  contactEmergency: "",
  phoneEmergency: "",
  email: "",
  typeBlood: "",
  salary: 1,
  password: "",
  positionId: "",
  roleId: "operario",
  projectId: "",
  certificates: [],
};

export const Operarios = () => {
  const { menu } = useMenuToggle();

  const dispatch = useDispatch();
  const { users, userUpdate } = useSelector((state) => state.userCrud);
  let operarios = users.filter((el) => el.role.value === "operario");
  const { projects } = useSelector((state) => state.project);
  const { cargos } = useSelector((state) => state.cargo);
  const { user } = useSelector(userSelector);

  const [action, setAction] = useState("create");
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState(newOperator);

  const limpiarCampo = () => {
    setInput(newOperator);
    setAction("create");
  };

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
    console.log(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in input) {
      formData.append(key, input[key]);
    }
    formData.delete("certificates");
    for (const { name, expiration } of input?.certificates) {
      formData.append("certificates", JSON.stringify({ name, expiration }));
      formData.append("files", name);
    }
    if (action === "create") {
      dispatch(createUser(formData));

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Opereario Creado Correctamente!",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      delete input.password;
      delete input.roleId;

      dispatch(updateUser(input.id, input));

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Operario Actualizado Correctamente!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    limpiarCampo();
  };

  const showUser = async (id) => {
    const response = await axios.get(
      "http://localhost:3001/api/admin/user/" + id
    );
    let user = response.data.data;
    let fechaNacimiento = user.birthday.split("T");

    setInput({
      id: user.id,
      dni: user.dni,
      name: user.name,
      lastName: user.lastName,
      birthday: fechaNacimiento[0],
      phone: user.phone,
      contactEmergency: user.contactEmergency,
      phoneEmergency: user.phoneEmergency,
      email: user.email,
      typeBlood: user.typeBlood,
      salary: user.salary,
      password: "password",
      positionId: user.positionId,
      roleId: "operario",
      projectId: user.projects.length > 0 ? user.projects[0].id : "",
      certificates: [],
    });
    setAction("edit");
    setErrors({});
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
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));

        Swal.fire("Eliminado!", "Operario eliminado con éxito.", "success");
      }
    });
  };

  let cantCertificates = 0;
  if (input.projectId) {
    let selectedProject = projects.find((el) => el.id === input.projectId);
    cantCertificates = selectedProject?.totalCertificates;
  }

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPag, setRecipesPag] = useState(10);
  const lastRecipe = currentPage * recipesPag;
  const firstRecipe = lastRecipe - recipesPag;

  const handlePag = (value) => {
    setCurrentPage(value);
  };

  let operariosPerPage = operarios.slice(firstRecipe, lastRecipe);

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllCargos());
    dispatch(getAllUsers());
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
        <section className="section dashboard">
          <div className="pagetitle">
            <h1>Operarios</h1>
            <nav>
              {user.role.value === "supervisor" ||
              user.role.value === "operario" ? (
                ""
              ) : (
                <button
                  className="btn btn-success mt-2 "
                  data-bs-toggle="modal"
                  data-bs-target="#verticalycentered"
                  onClick={() => limpiarCampo()}
                >
                  <i className="bi bi-plus-lg"></i> Crear Nuevo
                </button>
              )}
              <Form
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                input={input}
                action={action}
                Projects={projects}
                Cargos={cargos}
                errors={errors}
                cantCertificates={cantCertificates}
                setInput={setInput}
              />
            </nav>
          </div>
          <section className="section">
            <div className="row">
              <div className="col-lg-12">
                {user.role.value === "operario" ? (
                  <DetailOperario user={userUpdate} showUser={showUser} />
                ) : (
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
                              <th scope="col" colSpan={2}>
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {operariosPerPage &&
                              operariosPerPage.map((el, index) => (
                                <tr key={index}>
                                  <td>{el.name}</td>
                                  <td>{el.lastName}</td>
                                  <td>{el.dni}</td>
                                  <td>{el.phone}</td>
                                  <td>{el.contactEmergency}</td>
                                  <td>{el.phoneEmergency}</td>
                                  <td>{el.email}</td>
                                  <td>{el.typeBlood}</td>
                                  <td>
                                    {el.projects.length > 0
                                      ? el.projects[0].name
                                      : ""}
                                  </td>
                                  <td>{el.salary}</td>
                                  <td>
                                    <button
                                      className="btn btn-warning btn-sm"
                                      data-bs-toggle="modal"
                                      data-bs-target="#verticalycentered"
                                      onClick={() => showUser(el.id)}
                                    >
                                      <i className="bi bi-pencil-fill"></i>
                                    </button>
                                  </td>
                                  <td>
                                    {user.role.value === "supervisor" ? (
                                      ""
                                    ) : (
                                      <button className="btn btn-danger btn-sm ">
                                        <i
                                          className="bi bi-trash-fill"
                                          onClick={() => handleDelete(el.id)}
                                        ></i>
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Pagination
                totalPag={Math.ceil(operarios.length / recipesPag)}
                handlePag={handlePag}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};
