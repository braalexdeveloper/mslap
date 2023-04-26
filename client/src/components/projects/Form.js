import React from "react";

export const Form = ({ handleChange, handleSubmit, input, action }) => {
  return (
    <div className="modal fade" id="verticalycentered" tabindex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {action && action === "create"
                ? "Agregar Project"
                : "Editar Project"}
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
              <div className="col-12">
                <label for="inputNanme4" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  id="inputNanme4"
                  value={input.name}
                />
              </div>
              <div className="col-12">
                <label for="inputNanme4" className="form-label">
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  name="dateStart"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  id="inputNanme4"
                  value={input.dateStart}
                />
              </div>
              <div className="col-12">
                <label for="inputNanme4" className="form-label">
                  Fecha de Finalización
                </label>
                <input
                  type="date"
                  name="dateEnd"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  id="inputNanme4"
                  value={input.dateEnd}
                />
              </div>
              <div className="col-12">
                <label for="inputAddress" className="form-label">
                  N° Certificados
                </label>
                <input
                  type="number"
                  name="totalCertificates"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  id="inputAddress"
                  value={input.totalCertificates}
                />
              </div>
              <div className="col-12">
                <label for="inputAddress" className="form-label">
                  Ubicación
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                  name="location"
                  id="inputAddress"
                  value={input.location}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
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
