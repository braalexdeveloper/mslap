import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useMenuToggle from "../../hooks/useMenuToggle";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Sidebar } from "../Sidebar";
import { Form } from "./Form";
import { createUser, allUsers, deleteUser, allProjects, AllCargos,updateUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export const Contratistas = () => {

  const { menu } = useMenuToggle();
  const users = useSelector(state => state.contratistas);
  const responseCreateUser = useSelector(state => state.createUser);
  const responseDeleteUser = useSelector(state => state.deleteUser);
  const Projects = useSelector(state => state.projects);
  const Cargos = useSelector(state => state.cargos);
  const dispatch = useDispatch();
  const [action, setAction] = useState("create");
  //const [refresh,setRefresh]=useState(false);

  const [input, setInput] = useState({
    dni: '',
    name: '',
    lastName: '',
    birthday: '',
    phone: '',
    contactEmergency: '',
    phoneEmergency: '',
    email: '',
    typeBlood: '',
    salary: 0,
    password: '',
    positionId: '',
    roleId: "contratista",
    projectId: ''
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })

  }

  const limpiarCampo = () => {
    setInput({
      dni: '',
      name: '',
      lastName: '',
      birthday: '',
      phone: '',
      contactEmergency: '',
      phoneEmergency: '',
      email: '',
      typeBlood: '',
      salary: 0,
      password: '',
      positionId: '',
      roleId: "contratista",
      projectId: ''
    });
    setAction("create");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action === "create") {
      dispatch(createUser(input));

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Contratista Creado Correctamente!',
        showConfirmButton: false,
        timer: 2000
      })
      console.log(input)
    } else {
       dispatch(updateUser(input.id,input));
       Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Contratista Actualizado Correctamente!',
        showConfirmButton: false,
        timer: 2000
      })
    }
    limpiarCampo();
    dispatch(allUsers());

  }

  const showUser = async (id) => {
    const response = await axios.get('http://localhost:3001/api/admin/user/' + id);
    let user = response.data.data;
    let fechaNacimiento = user.birthday.split('T');


    setInput({
      id:user.id,
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
      //password: '',
      positionId: user.positionId,
     
      projectId: user.projects[0].id
    }
    );
    setAction("edit");
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
        dispatch(deleteUser(id));


        Swal.fire(
          'Eliminado!',
          'Contratista eliminado con éxito.',
          'success'
        )
      }
    })

  }


  useEffect(() => {
    dispatch(allProjects());
    dispatch(AllCargos());
    dispatch(allUsers());
  }, [dispatch])


  return (
    <>
      <Header />
      <Sidebar />

      <main id="main" className="main" style={{ marginLeft: menu ? '' : '0px' }}>


        <section className="section dashboard">
          <div className="pagetitle">
            <h1>Contratistas</h1>
            <nav>


              <button className='btn btn-success mt-2 ' data-bs-toggle="modal" data-bs-target="#verticalycentered" onClick={() => limpiarCampo()}>
                <i className="bi bi-plus-lg"></i> Crear Nuevo
              </button>
              <Form handleSubmit={handleSubmit} handleChange={handleChange} input={input} action={action} Projects={Projects} Cargos={Cargos} />
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
                          {users && users.map((el, index) => (
                            <tr key={index}>
                              <td>{el.name}</td>
                              <td>{el.lastName}</td>
                              <td>{el.dni}</td>
                              <td>{el.phone}</td>
                              <td>{el.contactEmergency}</td>
                              <td>{el.phoneEmergency}</td>
                              <td>{el.email}</td>
                              <td>{el.typeBlood}</td>
                              <td>{el.projects[0].name}</td>
                              <td>{el.salary}</td>
                              <td>
                                <button className="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#verticalycentered" onClick={() => showUser(el.id)}>
                                  <i className="bi bi-pencil-fill"></i>
                                </button>
                                &nbsp;
                                <button className="btn btn-danger btn-sm ">
                                  <i className="bi bi-trash-fill" onClick={() => handleDelete(el.id)}></i>
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
