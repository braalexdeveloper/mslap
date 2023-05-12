import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { url_api } from "../../utils/config";

const initialState = {
  users: [],
  create: {},
  update: {},
  delete: {},
};

export const userCrudSlice = createSlice({
  name: "userCrud",
  initialState,
  reducers: {
    allUsers: (state, action) => {
      state.users = action.payload.users;
    },
    create: (state, action) => {
      state.create = action.payload.dataCreate;
      state.users = action.payload.users;
    },
    update: (state, action) => {
      state.update = action.payload.dataUpdate;
      state.users = action.payload.users;
    },
    deleteuser: (state, action) => {
      state.delete = action.payload.dataDelete;
      state.users = action.payload.users;
    },
  },
});

const { allUsers, create, update, deleteuser } = userCrudSlice.actions;

const Users = async () => {
  const response = await axios.get(url_api + "/api/admin/users");
  return response.data.data;
};

export const getAllUsers = () => async (dispatch) => {
  let users = await Users();
  return dispatch(allUsers({ users }));
};

export const createUser = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(`${url_api}/api/admin/user`, formData);
    let users = await Users();
    return dispatch(create({ dataCreate: response.data, users }));
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (id, info) => async (dispatch) => {
  const response = await axios.put(url_api + "/api/admin/user/" + id, info);
  let users = await Users();
  return dispatch(update({ dataUpdate: response.data, users }));
};

export const deleteUser = (id) => async (dispatch) => {
  const response = await axios.delete(url_api + "/api/admin/user/" + id);
  let users = await Users();
  return dispatch(deleteuser({ dataUpdate: response.data, users }));
};
