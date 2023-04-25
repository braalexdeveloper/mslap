import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export const initialState = {
  islogout: true,
  user: {},
  status: -1,
  message: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    getLogin: (state, { payload }) => {
      state.islogout = false;
      state.status = payload.status;
      state.message = payload.message;
      state.user = payload.data;
    },
    getInfo: (state, { payload }) => {
      state.status = payload.status;
      state.message = payload.message;
    },
    getError: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.user = {};
    },
    resetState: (state) => {
      state.status = -1;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.islogout = true;
      state.status = -1;
      state.message = "";
      state.user = {};
    });
  },
});

const { getLogin, getInfo, getError, resetState } = adminSlice.actions;

export const adminSelector = (state) => state.admin;

export default adminSlice.reducer;

const URL_API = "http://localhost:3001/api";

// Resetear estado global
export const clearDataState = () => (dispatch) => {
  dispatch(resetState());
};

// Funciones para la ruta login
export const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const { data } = await axios(
        `${URL_API}/admin/login?email=${username}&password=${password}`
      );
      dispatch(getLogin(data));
    } catch (error) {
      dispatch(getError(error.response.data));
    }
  };

// Funciones para la ruta video
export const createVideo = (input) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${URL_API}/admin/video`, input);
    dispatch(getInfo(data));
  } catch (error) {
    dispatch(getError(error.response.data));
  }
};

export const updateVideo = (id, input) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${URL_API}/admin/video/${id}`, input);
    dispatch(getInfo(data));
  } catch (error) {
    dispatch(getError(error.response.data));
  }
};

export const deleteLogicalVideo = (id, input) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${URL_API}/admin/video/${id}?force=false`,
      {
        data: input,
      }
    );
    dispatch(getInfo(data));
  } catch (error) {
    dispatch(getError(error.response.data));
  }
};

export const deleteFisicalVideo = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${URL_API}/admin/video/${id}?force=true`
    );
    dispatch(getInfo(data));
  } catch (error) {
    dispatch(getError(error.response.data));
  }
};

// Funciones para  la ruta audio
export const createAudio = (input) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${URL_API}/admin/audio`, input);
    dispatch(getInfo(data));
  } catch (error) {
    dispatch(getError(error.response.data));
  }
};

export const updateAudio = (id, input) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${URL_API}/admin/audio/${id}`, input);
    dispatch(getInfo(data));
  } catch (error) {
    dispatch(getError(error.response.data));
    return error.response.data;
  }
};

export const deleteLogicalAudio = (id, input) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${URL_API}/admin/audio/${id}?force=false`,
      {
        data: input,
      }
    );
    dispatch(getInfo(data));
  } catch (error) {
    dispatch(getError(error.response.data));
    return error.response.data;
  }
};

export const deleteFisicalAudio = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${URL_API}/admin/audio/${id}?force=true`
    );
    dispatch(getInfo(data));
  } catch (error) {
    dispatch(getError(error.response.data));
  }
};
