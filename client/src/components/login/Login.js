import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { userSelector, login, clearInfo } from "../../slices/user/userSlice";
import { showAlertLogin, showAlertNormal } from "../../utils/showAlert";
import { validateLogin } from "../../utils/validation";
import "./style.css";

const data = {
  username: "",
  password: "",
  role: "",
};

export const Login = () => {
  const [input, setInput] = useState(data);
  const [error, setError] = useState(data);
  const inputRef = useRef(null);
  const { status, message } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateAccess = useCallback(async () => {
    if (status === 1) {
      await showAlertLogin(message, "", "success");
      dispatch(clearInfo());

      navigate("/dashboard/projects");
    } else if (status === 0) {
      showAlertNormal(message, "", "error");
    }
  }, [dispatch, status, message, navigate]);

  useEffect(() => {
    validateAccess();
    return () => {
      clearInputs();
      dispatch(clearInfo());
    };
  }, [dispatch, validateAccess]);

  useEffect(() => {
    setError(validateLogin({ ...input }));
  }, [input]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(input));
  };

  const clearInputs = () => {
    setInput(data);
    setError(data);
    inputRef.current?.focus();
  };

  return (
    <main id="login">
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <div className="logo d-flex align-items-center w-auto">
                    <img src={logo} alt="" />
                    <span className="d-none d-lg-block">MSLAPS</span>
                  </div>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Iniciar Sesion
                      </h5>
                      <p className="text-center small">
                        Ingrese su usuario y contraseña
                      </p>
                    </div>
                    <form
                      className="row g-3 needs-validation"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">
                          Usuario
                        </label>
                        <div className="input-group has-validation">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend"
                          >
                            @
                          </span>
                          <input
                            type="text"
                            name="username"
                            className="form-control"
                            id="yourUsername"
                            ref={inputRef}
                            value={input.username}
                            onChange={handleChange}
                            required
                          />
                          <div className="invalid-feedback">
                            Por favor ingrese su susuario.
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="yourPassword"
                          value={input.password}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Por favor ingrese su contraseña!
                        </div>
                      </div>
                      <div className="col-12">
                        <label htmlFor="yourRole" className="form-label">
                          Rol
                        </label>
                        <select
                          name="role"
                          className="form-control"
                          id="yourRole"
                          value={input.role}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- seleccione su rol --</option>
                          <option value="admin">Administrador</option>
                          <option value="contratista">Contratista</option>
                          <option value="supervisor">Supervisor</option>
                          <option value="operario">Operario</option>
                        </select>
                        <div className="invalid-feedback">
                          Por favor seleccione su rol!
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          Ingresar
                        </button>
                      </div>
                      <div className="col-12">
                        <span className="fw-light fst-italic">
                          En caso de olvidar su clave, favor contactarse con el
                          administrador
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
