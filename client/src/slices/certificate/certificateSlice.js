import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { url_api } from "../../utils/config";
import Swal from "sweetalert2";

// Estado inicial del slice
const initialState = {
  update: false
};

// Define el slice de certificate
export const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {
    update: (state, action) => {
      // Actualiza el estado de 'update' con el valor proporcionado en 'payload.dataUpdate'
      state.update = action.payload.dataUpdate;
    }
  },
});

const { update } = certificateSlice.actions;

// Acción para actualizar el certificado
export const updateCertificate = (id, observacion) => async (dispatch) => {
  try {
    // Realiza una petición PUT al API para actualizar la observación del certificado
    const response = await axios.put(url_api + "/api/certificate/observation/" + id, observacion);
    
    if (response.data.status) {
      // Si la respuesta del API indica éxito, muestra una notificación de éxito
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Observación Agregada Correctamente!",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    // Despacha la acción 'update' con el valor 'dataUpdate' establecido en true
    return dispatch(update({ dataUpdate: true }));
  } catch (error) {
    console.log(error);
    
    // Si ocurre un error, muestra una notificación de error
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "No se Agregó la Observación!",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

