import React from 'react';

export const Form = ({ handleChange, handleSubmit, input, action, Projects, Cargos }) => {

  return (
    <div className="modal fade" id="verticalycentered" tabindex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{action && action === "create" ? "Agregar Supervisor" : "Editar Supervisor"}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">

            <form className="row g-3" onSubmit={(e) => handleSubmit(e)}>
              <div className="col-12">
                <label for="inputNanme4" className="form-label">DNI</label>
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={input.dni} name="dni" id="inputNanme4" />
              </div>

              <div className="col-12">
                <label for="inputNanme4" className="form-label">Name</label>
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={input.name} name="name" id="inputNanme4" />
              </div>


              <div className="col-12">
                <label for="inputNanme4" className="form-label">Apellidos</label>
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={input.lastName} name="lastName" id="inputNanme4" />
              </div>


              <div className="col-12">
                <label for="inputNanme4" className="form-label">Fecha de Nacimiento</label>
                <input type="date" className="form-control" onChange={(e) => handleChange(e)} value={input.birthday} name="birthday" id="inputNanme4" />
              </div>


              <div className="col-12">
                <label for="inputNanme4" className="form-label">Telefono</label>
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={input.phone} name="phone" id="inputNanme4" />
              </div>


              <div className="col-12">
                <label for="inputNanme4" className="form-label">Contacto de Emergencia</label>
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={input.contactEmergency} name="contactEmergency" id="inputNanme4" />
              </div>

              <div className="col-12">
                <label for="inputNanme4" className="form-label">Telf. de Emergencia</label>
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={input.phoneEmergency} name="phoneEmergency" id="inputNanme4" />
              </div>

              <div className="col-12">
                <label for="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" onChange={(e) => handleChange(e)} value={input.email} name="email" id="inputEmail4" />
              </div>

              <div className="col-12">
                <label for="inputAddress" className="form-label">Tipo de Sangre</label>
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={input.typeBlood} name="typeBlood" id="inputAddress" />
              </div>

              <div className="col-12">
                <label for="inputAddress" className="form-label">Salario</label>
                <input type="number" className="form-control" onChange={(e) => handleChange(e)} value={input.salary} name="salary" id="inputAddress" />
              </div>
              {action && action === "create" ?
                <div className="col-12">
                  <label for="inputPassword4" className="form-label">Password</label>
                  <input type="password" className="form-control" onChange={(e) => handleChange(e)} value={input.password} name="password" id="inputPassword4" />
                </div>
                : ''}


              <div className="col-12">
                <label for="inputPassword4" className="form-label">Cargo</label>
                <select onChange={(e) => handleChange(e)} name="positionId" className="form-control">
                  <option>Selecciona un Cargo</option>
                  {Cargos && Cargos.map((el, index) => (
                    <option key={index} selected={el.id === input.positionId ? true : false} value={el.id}>{el.name}</option>
                  ))}

                </select>
              </div>
              {action && action === "create" ? <div className="col-12">
                <label for="inputPassword4" className="form-label">Proyecto</label>
                <select onChange={(e) => handleChange(e)} name="projectId" className="form-control">
                  <option>Selecciona un Proyecto</option>
                  {Projects && Projects.map((el, index) => (
                    <option key={index} selected={el.id === input.projectId ? true : false} value={el.id}>{el.name}</option>
                  ))}
                </select>
              </div> : ''}

              <div className="text-center">
                <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Guardar</button>

                <button type="button" className="btn btn-danger mx-2" data-bs-dismiss="modal">Close</button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
