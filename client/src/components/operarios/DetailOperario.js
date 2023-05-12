import React from 'react'

export const DetailOperario = ({ user,showUser}) => {

    return (
        <>
            {/*style="width: 18rem;"*/}
            <div class="card" >
                <div class="card-body pb-0 ">
                    <h5 class="card-title">{user.name.toUpperCase() + " " + user.lastName.toUpperCase()}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>DNI : </strong>{user.dni}</li>
                    <li class="list-group-item"><strong>Email : </strong>{user.email}</li>
                    <li class="list-group-item"><strong>Celular : </strong>{user.phone}</li>
                    <li class="list-group-item"><strong>Contacto de Emergencia : </strong>{user.contactEmergency.charAt(0).toUpperCase()+user.contactEmergency.slice(1)}</li>
                    <li class="list-group-item"><strong>Teléfono de Emergencia : </strong>{user.phoneEmergency}</li>
                    <li class="list-group-item"><strong>Salario : </strong>${user.salary}</li>
                </ul>
                <div class="card-body">
                    <button
                                    className="btn btn-warning btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#verticalycentered"
                                    onClick={() => showUser(user.id)}
                                  >
                                  Editar  <i className="bi bi-pencil-fill"></i> 
                                  </button>
                </div>
            </div>
        </>
    )
}
