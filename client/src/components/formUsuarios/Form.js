import React from "react";
import { Certificates } from "../certificates/Certificates";
import { userSelector } from "../../slices/user/userSlice";
import { useSelector } from "react-redux";

export const Form = ({
  handleChange,
  handleSubmit,
  input,
  action,
  Projects,
  Cargos,
  errors,
  cantCertificates,
  setInput,
}) => {
  const { user } = useSelector(userSelector);
  console.log(input);
  return (
    <div
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="verticalycentered"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {action && action === "create"
                ? "Agregar " + input.roleId
                : "Editar " + input.roleId}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="row g-3" onSubmit={(e) => handleSubmit(e)}>
              {user.role.value !== "operario" ? (
                <>
                  <div className="col-6">
                    <label htmlFor="dni" className="form-label">
                      DNI
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={input.dni}
                      name="dni"
                      id="dni"
                    />
                    {errors.dni && (
                      <div
                        className="alert alert-danger alert-dismissible fade show my-2"
                        role="alert"
                      >
                        <span>{errors.dni}</span>
                      </div>
                    )}
                  </div>
                  <div className="col-6">
                    <label htmlFor="name" className="form-label">
                      Nombre(s)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={input.name}
                      name="name"
                      id="name"
                    />
                    {errors.name && (
                      <div
                        className="alert alert-danger alert-dismissible fade show my-2"
                        role="alert"
                      >
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="col-6">
                    <label htmlFor="lastName" className="form-label">
                      Apellido(s)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={input.lastName}
                      name="lastName"
                      id="lastName"
                    />
                    {errors.lastName && (
                      <div
                        className="alert alert-danger alert-dismissible fade show my-2"
                        role="alert"
                      >
                        <span>{errors.lastName}</span>
                      </div>
                    )}
                  </div>
                  <div className="col-6">
                    <label htmlFor="birthday" className="form-label">
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={input.birthday}
                      name="birthday"
                      id="birthday"
                    />
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="col-6">
                <label htmlFor="phone" className="form-label">
                  Teléfono
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                  value={input.phone}
                  name="phone"
                  id="phone"
                />
                {errors.phone && (
                  <div
                    className="alert alert-danger alert-dismissible fade show my-2"
                    role="alert"
                  >
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>
              <div className="col-6">
                <label htmlFor="contactEmergency" className="form-label">
                  Contacto de Emergencia
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                  value={input.contactEmergency}
                  name="contactEmergency"
                  id="contactEmergency"
                />
                {errors.contactEmergency && (
                  <div
                    className="alert alert-danger alert-dismissible fade show my-2"
                    role="alert"
                  >
                    <span>{errors.contactEmergency}</span>
                  </div>
                )}
              </div>
              <div className="col-6">
                <label htmlFor="phoneEmergency" className="form-label">
                  Telf. de Emergencia
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                  value={input.phoneEmergency}
                  name="phoneEmergency"
                  id="phoneEmergency"
                />
                {errors.phoneEmergency && (
                  <div
                    className="alert alert-danger alert-dismissible fade show my-2"
                    role="alert"
                  >
                    <span>{errors.phoneEmergency}</span>
                  </div>
                )}
              </div>
              <div className="col-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                  value={input.email}
                  name="email"
                  id="email"
                />
                {errors.email && (
                  <div
                    className="alert alert-danger alert-dismissible fade show my-2"
                    role="alert"
                  >
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>
              {user.role.value !== "operario" ? (
                <>
                  <div className="col-6">
                    <label htmlFor="typeBlood" className="form-label">
                      Tipo de Sangre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={input.typeBlood}
                      name="typeBlood"
                      id="typeBlood"
                    />
                    {errors.typeBlood && (
                      <div
                        className="alert alert-danger alert-dismissible fade show my-2"
                        role="alert"
                      >
                        <span>{errors.typeBlood}</span>
                      </div>
                    )}
                  </div>
                  <div className="col-6">
                    <label htmlFor="salary" className="form-label">
                      Salario
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={input.salary}
                      name="salary"
                      id="salary"
                      min={0}
                      step={1}
                    />
                  </div>
                  {action && action === "create" ? (
                    <div className="col-6">
                      <label htmlFor="password" className="form-label">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                        value={input.password}
                        name="password"
                        id="password"
                      />
                      {errors.password && (
                        <div
                          className="alert alert-danger alert-dismissible fade show my-2"
                          role="alert"
                        >
                          <span>{errors.password}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="col-6">
                    <label className="form-label">Cargo</label>
                    <select
                      name="positionId"
                      className="form-control"
                      value={input.positionId}
                      onChange={(e) => handleChange(e)}
                    >
                      <option>Selecciona un Cargo</option>
                      {Cargos &&
                        Cargos.map((el, index) => (
                          <option key={index} value={el.id}>
                            {el.name}
                          </option>
                        ))}
                    </select>
                    {errors.positionId && (
                      <div
                        className="alert alert-danger alert-dismissible fade show my-2"
                        role="alert"
                      >
                        <span>{errors.positionId}</span>
                      </div>
                    )}
                  </div>
                  {action && action === "create" ? (
                    <div className="col-6">
                      <label className="form-label">Proyecto</label>
                      <select
                        name="projectId"
                        className="form-control"
                        value={input.projectId}
                        onChange={(e) => handleChange(e)}
                      >
                        <option>Selecciona un Proyecto</option>
                        {Projects &&
                          Projects.map((el, index) => (
                            <option key={index} value={el.id}>
                              {el.name}
                            </option>
                          ))}
                      </select>
                      {errors.projectId && (
                        <div
                          className="alert alert-danger alert-dismissible fade show my-2"
                          role="alert"
                        >
                          <span>{errors.projectId}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {(user.role.value === "admin" ||
                    user.role.value === "contratista") &&
                  cantCertificates > 0 ? (
                    <div className="col-6">
                      <Certificates
                        count={cantCertificates}
                        input={input}
                        setInput={setInput}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  disabled={
                    Object.keys(errors).length > 0 || input.dni === ""
                      ? true
                      : false
                  }
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
