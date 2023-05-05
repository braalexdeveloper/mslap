import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { url_api } from "../../utils/config";


export const initialState = {
  isLogin: false,
  user: {},
  message: "",
  status: -1,
 };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getLogin: (state, { payload }) => {
      state.isLogin = true;
      state.user = payload.data;
    },
    getUserDetail: (state, { payload }) => {
      state.user = payload.data;
    },
    getInfo: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
    },
    getError: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.user = {};
    },
    updateImage: (state, { payload }) => {
      state.user = { ...state.user, ...payload.data };
    },
    resetInfo: (state) => {
      state.message = "";
      state.status = -1;
    },
    resetState: (state) => {
      state.isLogin = false;
      state.user = {};
      state.message = "";
      state.status = -1;
    },
    
  },
});

const {
  getLogin,
  getUserDetail,
  getInfo,
  getError,
  updateImage,
  resetInfo,
  resetState,
  } = userSlice.actions;

export const userSelector = (state) => state.user;

export default userSlice.reducer;

// Resetear estado global
export const clearDataState = () => (dispatch) => {
  dispatch(resetState());
};

// Resetear mensaje y status
export const clearInfo = () => (dispatch) => {
  dispatch(resetInfo());
};

// Funciones para la ruta login
export const login =
  ({ username, password, role }) =>
    async (dispatch) => {
      try {
        const { data } = await axios(
          `${url_api}/api/user/login?email=${username}&password=${password}&role=${role}`
        );
        dispatch(getLogin(data));
        dispatch(getInfo(data));
      } catch (error) {
        dispatch(getError(error.response.data));
      }
    };

export const getUserById = (id) => async (dispatch) => {
  try {
    const { data } = await axios(`${url_api}/api/user/${id}`);
    dispatch(getUserDetail(data));
  } catch (error) {
    dispatch(getError(error.response.data));
  }
};

export const changeImageProfile = (id, formData) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${url_api}/api/user/changeImage/${id}`,
      formData
    );
    console.log(data)
    dispatch(updateImage(data));
    dispatch(getInfo(data));
  } catch (error) {
    dispatch(getError(error.response.data));
  }
};

export const updatePassword = (id, input) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${url_api}/api/user/resetPass/${id}`, input);
    dispatch(getInfo(data));
  } catch (error) {
    dispatch(getError(error.response.data));
  }
};
