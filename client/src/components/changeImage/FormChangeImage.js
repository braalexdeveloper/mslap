import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeImageProfile, clearInfo, userSelector } from "../../slices/user/userSlice";
import { showAlertNormal, showAlertWithTimer } from "../../utils/showAlert";
import { validateProfileImage } from "../../utils/validation";

const newData = {
  image: "",
  url: "",
};

export const FormChangeImage = () => {
  const [file, setFile] = useState(newData);
  const [error, setError] = useState(newData);
  const { status, message, user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const validateAccess = useCallback(async () => {
    if (status === 1) {
      await showAlertWithTimer(message, "", "success");
    } else if (status === 0) {
      await showAlertNormal(message, "", "error");
    }
  }, [status, message]);

  useEffect(() => {
    validateAccess();
    return () => {
      clearInputs();
      dispatch(clearInfo());
    };
  }, [dispatch, validateAccess]);

  useEffect(() => {
    setError(validateProfileImage({ ...file }));
  }, [file]);

  const handleChange = (e) => {
    const image = e.target.files[0];
    const url = URL.createObjectURL(image);
    setFile({...file, image, url});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file.image);
    dispatch(
      changeImageProfile(user?.id, formData)
    );
  };

  const clearInputs = () => {
    setFile(newData);
    setError(newData);
    inputRef.current?.focus();
  };

  const errorMessage = (input) => (
    <span className={`${input ? "d-inline-flex" : "d-none"} invalid-feedback`}>
      {input}
    </span>
  );

  return (
    <div
      className="tab-pane fade show active profile-edit pt-3"
      id="profile-edit"
    >
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label
            htmlFor="profileImage"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Imágen de Perfil
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              type="file"
              className="form-control"
              onChange={handleChange}
            />
            <div className="pt-2">
              <img src={file.url} alt="Profile" className="mt-2" />
              {errorMessage(error.image)}
            </div>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};
