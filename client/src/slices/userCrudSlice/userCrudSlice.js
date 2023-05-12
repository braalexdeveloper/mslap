import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { url_api } from "../../utils/config";


const initialState = {
  users: [],
  userUpdate:{},
  create:{},
  update:{},
  delete:{}
};

export const userCrudSlice = createSlice({
  name: "userCrud",
  initialState,
  reducers: {
    allUsers: (state, action) => {
      state.users = action.payload.users
    },
    get_user:(state,action)=>{
     state.userUpdate=action.payload.user
    },
    create:(state,action)=>{
      state.create=action.payload.dataCreate
      state.users =action.payload.users
    },
    update:(state,action)=>{
      state.update=action.payload.dataUpdate
      state.users =action.payload.users
      state.userUpdate=action.payload.user
    },
    deleteuser:(state,action)=>{
        state.delete=action.payload.dataDelete
        state.users =action.payload.users
    }
  },
});

const {allUsers,create,update,deleteuser,get_user} = userCrudSlice.actions;



const Users = async () => {
  const response = await axios.get(url_api + '/api/admin/users');
  return response.data.data;
}

const User = async (id) => {
  const response = await axios.get(url_api + '/api/admin/user/'+id);
  return response.data.data;
}

export const getAllUsers = () => async (dispatch) => {
  let users = await Users();
  return dispatch(allUsers({users}))
}

export const getUser = (id) => async (dispatch) => {
  let user = await User(id);
  return dispatch(get_user({user}))
}

export const createUser = (info) => async (dispatch) => {
    try {
        const response = await axios.post(url_api + '/api/admin/user', info);
  let users = await Users();
  return dispatch(create({dataCreate:response.data,users}))
    } catch (error) {
        console.log(error)
    }
  
}

export const updateUser = (id, info) => async (dispatch) => {
  try {
  const response = await axios.put(url_api + '/api/admin/user/' + id, info);
  let users = await Users();
  let user = await User(id);
  return dispatch(update({dataUpdate:response.data,users,user}))
} catch (error) {
  console.log(error)
}
}

export const deleteUser = (id) => async (dispatch) => {
  const response = await axios.delete(url_api + '/api/admin/user/' + id);
  let users = await Users();
  return dispatch(deleteuser({dataUpdate:response.data,users}))
}