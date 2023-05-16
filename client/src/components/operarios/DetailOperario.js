import React from "react";
import { Link } from "react-router-dom";
import { getUserById } from "../../slices/userCrudSlice/userCrudSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const DetailOperario = ({ user, showUser }) => {
  const dispatch = useDispatch();
  const { userById } = useSelector((state) => state.userCrud);
  const arrayObservations = userById.certificates.filter((el) => {
    if (el.observation !== null) {
      return el;
    } else return false;
  });

  useEffect(() => {
    dispatch(getUserById(user.id));
  }, [dispatch, user.id]);

  return (
    <>
      {/*style="width: 18rem;"*/}
      <div className="card">
        <div className="card-body pb-0 ">
          <h5 className="card-title">
            {user?.name.toUpperCase() + " " + user?.lastName.toUpperCase()}
          </h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>DNI : </strong>
            {user?.dni}
          </li>
          <li className="list-group-item">
            <strong>Email : </strong>
            {user?.email}
          </li>
          <li className="list-group-item">
            <strong>Celular : </strong>
            {user?.phone}
          </li>
          <li className="list-group-item">
            <strong>Contacto de Emergencia : </strong>
            {user?.contactEmergency.charAt(0).toUpperCase() +
              user?.contactEmergency.slice(1)}
          </li>
          <li className="list-group-item">
            <strong>Teléfono de Emergencia : </strong>
            {user?.phoneEmergency}
          </li>
          <li class="list-group-item">
            <strong>Salario : </strong>${user?.salary}
          </li>
        </ul>
        <div className="card-body">
          <button
            className="btn btn-warning btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#verticalycentered"
            onClick={() => showUser(user?.id)}
          >
            Editar <i className="bi bi-pencil-fill"></i>
          </button>
          {arrayObservations.length > 0 ? (
            <Link
              to={"/dashboard/certificates/" + user.id}
              className="btn btn-danger ms-2 btn-sm"
            >
              Tienes Observaciones <i className="bi bi-pencil-fill"></i>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
