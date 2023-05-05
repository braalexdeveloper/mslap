import React from 'react'

export const Form = ({ handleChange, handleSubmit, input, action, Projects, Cargos, errors }) => {
  return (
    <div className="modal fade" id="verticalycentered" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{action && action === "create" ? "Agregar Supervisor" : "Editar Supervisor"}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">

            <form className="row g-3" onSubmit={(e) => handleSubmit(e)}>
              <div className="col-12">
                <label htmlFor="dni" className="form-label">DNI</label>
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={input.dni} name="dni" id="dni" />
                {errors.dni && (
                  <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                    <span>{errors.dni}</span>
                  </div>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={input.name} name="name" id="name" />
                {errors.name && (
                  <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>


              <div className="col-12">
                <label htmlFor="lastName" className="form-label">Apellidos</label>
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={input.lastName} name="lastName" id="lastName" />
                {errors.lastName && (
                  <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                    <span>{errors.lastName}</span>
                  </div>
                )}
              </div>


              <div className="col-12">
                <label htmlFor="birthday" className="form-label">Fecha de Nacimiento</label>
                <input type="date" className="form-control" onChange={(e) => handleChange(e)} value={input.birthday} name="birthday" id="birthday" />
              </div>


              <div className="col-12">
                <label htmlFor="phone" className="form-label">Telefono</label>
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={input.phone} name="phone" id="phone" />
                {errors.phone && (
                  <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>


              <div className="col-12">
                <label htmlFor="contactEmergency" className="form-label">Contacto de Emergencia</label>
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={input.contactEmergency} name="contactEmergency" id="contactEmergency" />
                {errors.contactEmergency && (
                  <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                    <span>{errors.contactEmergency}</span>
                  </div>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="phoneEmergency" className="form-label">Telf. de Emergencia</label>
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={input.phoneEmergency} name="phoneEmergency" id="phoneEmergency" />
                {errors.phoneEmergency && (
                  <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                    <span>{errors.phoneEmergency}</span>
                  </div>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" onChange={(e) => handleChange(e)} value={input.email} name="email" id="email" />
                {errors.email && (
                  <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="typeBlood" className="form-label">Tipo de Sangre</label>
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={input.typeBlood} name="typeBlood" id="typeBlood" />
                {errors.typeBlood && (
                  <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                    <span>{errors.typeBlood}</span>
                  </div>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="salary" className="form-label">Salario</label>
                <input type="number" className="form-control" onChange={(e) => handleChange(e)} value={input.salary} name="salary" id="salary" />
              </div>
              {action && action === "create" ?
                <div className="col-12">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" onChange={(e) => handleChange(e)} value={input.password} name="password" id="password" />
                  {errors.password && (
                    <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>
                : ''}


              <div className="col-12">
                <label  className="form-label">Cargo</label>
                <select onChange={(e) => handleChange(e)} name="positionId" className="form-control">
                  <option>Selecciona un Cargo</option>
                  {Cargos && Cargos.map((el, index) => (
                    <option key={index} selected={el.id === input.positionId ? true : false} value={el.id}>{el.name}</option>
                  ))}

                </select>
                {errors.positionId && (
                  <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                    <span>{errors.positionId}</span>
                  </div>
                )}
              </div>
              {action && action === "create" ? <div className="col-12">
                <label  className="form-label">Proyecto</label>
                <select onChange={(e) => handleChange(e)} name="projectId" className="form-control">
                  <option>Selecciona un Proyecto</option>
                  {Projects && Projects.map((el, index) => (
                    <option key={index} selected={el.id === input.projectId ? true : false} value={el.id}>{el.name}</option>
                  ))}
                </select>
                {errors.projectId && (
                  <div className='alert alert-danger alert-dismissible fade show my-2' role="alert">
                    <span>{errors.projectId}</span>
                  </div>
                )}
              </div> : ''}

              <div className="text-center">
                <button type="submit" className="btn btn-success" data-bs-dismiss="modal" disabled={Object.keys(errors).length>0 || input.dni === '' ? true:false}>Guardar</button>

                <button type="button" className="btn btn-danger mx-2" data-bs-dismiss="modal">Close</button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
