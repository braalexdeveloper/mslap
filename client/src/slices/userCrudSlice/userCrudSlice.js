import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { url_api } from "../../utils/config";

const initialState = {
  users: [],
  userUpdate: {},
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
    getUser: (state, action) => {
      state.userUpdate = action.payload.user;
    },
    create: (state, action) => {
      state.create = action.payload.dataCreate;
      state.users = action.payload.users;
    },
    update: (state, action) => {
      state.update = action.payload.dataUpdate;
      state.users = action.payload.users;
      state.userUpdate = action.payload.user;
    },
  },
});

const { allUsers, create, update, deleteuser, getUser } =
  userCrudSlice.actions;

const Users = async () => {
  const response = await axios.get(url_api + "/api/admin/users");
  return response.data.data;
};

const User = async (id) => {
  const response = await axios.get(url_api + "/api/admin/user/" + id);
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
  try {
    const response = await axios.put(url_api + "/api/admin/user/" + id, info);
    let users = await Users();
    let user = await User(id);
    return dispatch(update({ dataUpdate: response.data, users, user }));
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = (id) => async (dispatch) => {
  let user = await User(id);
  return dispatch(getUser({ user }));
};

export const deleteUser = (id) => async (dispatch) => {
  const response = await axios.delete(url_api + "/api/admin/user/" + id);
  let users = await Users();
  return dispatch(deleteuser({ dataUpdate: response.data, users }));
};
