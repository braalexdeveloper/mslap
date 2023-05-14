import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { url_api } from "../../utils/config";
import Swal from "sweetalert2";

const initialState = {
    update:false
   };
  
  export const certificateSlice = createSlice({
    name: "certificate",
    initialState,
    reducers: {
      update: (state, action) => {
        state.update = action.payload.dataUpdate;
      }
    },
  });
  
  const { update } =certificateSlice.actions;
  
  
  
  export const updateCertificate = (id, observacion) => async (dispatch) => {
    try {
      const response = await axios.put(url_api + "/api/certificate/observation/" + id, observacion);
      if(response.data.status){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Observación Agregada Correctamente!",
            showConfirmButton: false,
            timer: 2000,
          });
      }
      return dispatch(update({ dataUpdate:true}));
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se Agregó la Observación!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  
  