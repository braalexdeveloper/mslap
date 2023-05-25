import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { url_api } from "../../utils/config";

// Estado inicial del slice
const initialState = {
  users: [],
  userUpdate: {},
  userById: {},
  create: {},
  update: {},
  delete: {},
};

// Define el slice de userCrud
export const userCrudSlice = createSlice({
  name: "userCrud",
  initialState,
  reducers: {
    // Acción para almacenar todos los usuarios
    allUsers: (state, action) => {
      state.users = action.payload.users;
    },
    // Acción para obtener y almacenar un usuario específico
    getUser: (state, action) => {
      state.userUpdate = action.payload.user;
      state.userById = action.payload.user;
    },
    // Acción para crear un nuevo usuario
    create: (state, action) => {
      state.create = action.payload.dataCreate;
      state.users = action.payload.users;
    },
    // Acción para actualizar un usuario existente
    update: (state, action) => {
      state.update = action.payload.dataUpdate;
      state.users = action.payload.users;
      state.userUpdate = action.payload.user;
    },
    // Acción para eliminar un usuario
    deleteuser: (state, action) => {
      state.users = action.payload.users;
      state.delete = action.payload.dataDelete;
    },
  },
});

const { allUsers, create, update, deleteuser, getUser } = userCrudSlice.actions;

// Función para obtener todos los usuarios mediante una petición GET
const Users = async () => {
  const response = await axios.get(url_api + "/api/admin/users");
  return response.data.data;
};

// Función para obtener un usuario específico mediante una petición GET con el ID
const User = async (id) => {
  const response = await axios.get(url_api + "/api/admin/user/" + id);
  return response.data.data;
};

// Acción para obtener todos los usuarios
export const getAllUsers = () => async (dispatch) => {
  let users = await Users();
  return dispatch(allUsers({ users }));
};

// Acción para crear un nuevo usuario
export const createUser = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(`${url_api}/api/admin/user`, formData);
    let users = await Users();
    return dispatch(create({ dataCreate: response.data, users }));
  } catch (error) {
    console.log(error);
  }
};

// Acción para actualizar un usuario existente
export const updateUser = (id, info) => async (dispatch) => {
  try {
    const response = await axios.put(url_api + "/api/admin/user/" + id, info);
    let users = await Users();
    let user = await User(id);
    return dispatch(update({ dataUpdate: response.data, users, user }));
  } catch (error) {
    console.log(error);
  }
};

// Acción para obtener un usuario específico mediante su ID
export const getUserById = (id) => async (dispatch) => {
  let user = await User(id);
  return dispatch(getUser({ user }));
};

// Acción para eliminar un usuario
export const deleteUser = (id) => async (dispatch) => {
  const response = await axios.delete(url_api + "/api/admin/user/" + id);
  let users = await Users();
  return dispatch(deleteuser({ dataDelete: response.data, users }));
};

