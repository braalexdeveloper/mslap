import React, { useCallback, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updatePassword, userSelector } from "../../slices/user/userSlice";
import { showAlertNormal, showAlertWithTimer } from "../../utils/showAlert";
import { validatePassword } from "../../utils/validation";

const newForm = {
  currPassword: "",
  newPassword: "",
  rePassword: "",
};

export const FormChangePassword = () => {
  const [input, setInput] = useState(newForm);
  const [error, setError] = useState(newForm);
  const { status, message, user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const validateAccess = useCallback(async () => {
    if (status === 1) {
      await showAlertWithTimer(message, "", "success");
    } else if (status === 0) {
      showAlertNormal(message, "", "error");
    }
  }, [status, message]);

  useEffect(() => {
    validateAccess();
    return () => {
      clearInputs();
    };
  }, [validateAccess]);

  useEffect(() => {
    setError(validatePassword({ ...input }));
  }, [input]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(user?.id, input));
  };

  const clearInputs = () => {
    setInput(newForm);
    setError(newForm);
    inputRef.current?.focus();
  };

  const focusErrorInput = (input) => `form-control ${input && "border-danger"}`;

  const errorMessage = (input) => (
    <span className={`${input ? "d-inline-flex" : "d-none"} invalid-feedback`}>
      {input}
    </span>
  );

  return (
    <div className="tab-pane fade pt-3" id="profile-change-password">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label
            htmlFor="currentPassword"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Contraseña Actual
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="currPassword"
              type="password"
              className={focusErrorInput(error.currPassword)}
              id="currentPassword"
              value={input.currPassword}
              onChange={handleChange}
            />
          </div>
          {errorMessage(error.currPassword)}
        </div>
        <div className="row mb-3">
          <label
            htmlFor="newPassword"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Nueva Contraseña
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="newPassword"
              type="password"
              className={focusErrorInput(error.newPassword)}
              id="newPassword"
              value={input.newPassword}
              onChange={handleChange}
            />
          </div>
          {errorMessage(error.newPassword)}
        </div>
        <div className="row mb-3">
          <label
            htmlFor="renewPassword"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Confirmar Nueva Contraseña
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="rePassword"
              type="password"
              className={focusErrorInput(error.rePassword)}
              id="renewPassword"
              value={input.rePassword}
              onChange={handleChange}
            />
          </div>
          {errorMessage(error.rePassword)}
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Cambiar Contraseña
          </button>
        </div>
      </form>
    </div>
  );
};
