import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useMenuToggle from "../../hooks/useMenuToggle";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Sidebar } from "../Sidebar";

import { Form } from "../formUsuarios/Form";
import { validate } from "../formUsuarios/Validate";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../slices/userCrudSlice/userCrudSlice";
import { getAllProjects } from "../../slices/project/projectSlice";
import { getAllCargos } from "../../slices/cargo/cargoSlice";
//import { userSelector } from "../../slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../pagination/Pagination";
import { Search } from "../search/Search";
import { url_api } from "../../utils/config";
export const Contratistas = () => {
  const { menu } = useMenuToggle();
  const { users } = useSelector((state) => state.userCrud);
  let contratistas = users.filter((el) => el.role.value === "contratista");
  const { projects } = useSelector((state) => state.project);
  const { cargos } = useSelector((state) => state.cargo);
  //const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [action, setAction] = useState("create");
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    dni: "",
    name: "",
    lastName: "",
    birthday: "",
    phone: "",
    contactEmergency: "",
    phoneEmergency: "",
    email: "",
    typeBlood: "",
    salary: 0,
    password: "",
    positionId: "",
    roleId: "contratista",
    projectId: "",
    certificates: [],
  });

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value)

  }

  if (search !== "") {
    contratistas = contratistas.filter(el => el.dni === search);
  }

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
      dni: "",
      name: "",
      lastName: "",
      birthday: "",
      phone: "",
      contactEmergency: "",
      phoneEmergency: "",
      email: "",
      typeBlood: "",
      salary: 0,
      password: "",
      positionId: "",
      roleId: "contratista",
      projectId: "",
      certificates: [],
    });
    setAction("create");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action === "create") {
      dispatch(createUser(input));

    } else {
      
      delete input.roleId;
      dispatch(updateUser(input.id, input));
      
    }
    limpiarCampo();
  };

  const showUser = async (id) => {
    const response = await axios.get(
      url_api+"/api/admin/user/" + id
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
      password: user.password,
      positionId: user.positionId,
      roleId: "contratista",
      projectId: user.projects[0].id,
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
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));

        Swal.fire("Eliminado!", "Contratista eliminado con éxito.", "success");
      }
    });
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPag, setRecipesPag] = useState(10);
  const lastRecipe = currentPage * recipesPag;
  const firstRecipe = lastRecipe - recipesPag;

  const handlePag = (value) => {
    setCurrentPage(value);
  };

  const contratistasPerPage = contratistas.slice(firstRecipe, lastRecipe);

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
        {/*user.role.value && user.role.value!=="admin" ? <h1>No tienes acceso</h1> :*/}
        <section className="section dashboard">

        <div className="pagetitle">
          <h1>Contratistas</h1>
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
              Projects={projects}
              Cargos={cargos} 
              errors={errors}
            />
          </nav>
          <Search handleSearch={handleSearch} />
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
                          <th scope="col">DNI/Cédula</th>
                          <th scope="col">Telf. Contacto</th>
                          <th scope="col">Contacto de Emergencia</th>
                          <th scope="col">Telf. Emergencia</th>
                          <th scope="col">Email</th>
                          <th scope="col">Tipo de Sangre</th>
                          <th scope="col">Proyecto</th>
                          <th scope="col">Sueldo</th>
                          <th scope="col" colSpan={2}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contratistasPerPage &&
                          contratistasPerPage.map((el, index) => (
                            <tr key={index}>
                              <td>{el.name}</td>
                              <td>{el.lastName}</td>
                              <td>{el.dni}</td>
                              <td>{el.phone}</td>
                              <td>{el.contactEmergency}</td>
                              <td>{el.phoneEmergency}</td>
                              <td>{el.email}</td>
                              <td>{el.typeBlood}</td>
                              <td>{el.projects.length > 0 ? el.projects[0].name : ''}</td>
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
                                <button className="btn btn-danger btn-sm ">
                                  <i
                                    className="bi bi-trash-fill"
                                    onClick={() => handleDelete(el.id)}
                                  ></i>
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
            <Pagination
              totalPag={Math.ceil(contratistas.length / recipesPag)}
              handlePag={handlePag}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};
