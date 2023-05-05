import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = "http://localhost:3001/api";

const initialState = {
    cargos: [],
    create: {},
    update: {},
    delete: {}
}

export const cargoSlice = createSlice({
    name: "cargo",
    initialState,
    reducers: {
        allCargos: (state, action) => {
            state.cargos = action.payload.dataCargos
        },
        create: (state, action) => {
            state.create = action.payload.dataCreate
        },
        update: (state, action) => {
            state.update = action.payload.dataUpdate
        },
        deletecargo: (state, action) => {
            state.delete = action.payload.dataDelete
            state.cargos=action.payload.cargos
        }
    },
})

const { allCargos, create, update, deletecargo } = cargoSlice.actions;

const Cargos=async()=>{
    const response = await axios.get(URL_API + '/admin/positions');
    let cargos = new Set(response.data.data.map(el => {
        return {
            id: el.id,
            name: el.name
        }
    }).map(JSON.stringify));

    let dataCargos = Array.from(cargos).map(JSON.parse)
    return dataCargos;
}

export const getAllCargos = () => async (dispatch) => {

    const response = await axios.get(URL_API + '/admin/positions');
    let cargos = new Set(response.data.data.map(el => {
        return {
            id: el.id,
            name: el.name
        }
    }).map(JSON.stringify));

    let dataCargos = Array.from(cargos).map(JSON.parse)

    dispatch(allCargos({ dataCargos }))
};


export const createCargo = (cargo) => async (dispatch) => {
    try {
        const response = await axios.post(URL_API + '/admin/position', cargo);
       
        return dispatch(create({ dataCreate: response.data })) 
    } catch (error) {
        console.log(error)
    }
  
}

export const updateCargo = (id, info) => async (dispatch) => {
    const response = await axios.put(URL_API + '/admin/position/' + id, info);
    return dispatch(update({ dataUpdate: response.data }))
}

export const deleteCargo = (id) => async (dispatch) => {
    const response = await axios.delete(URL_API + '/admin/position/' + id);
    let cargos=await Cargos();
    dispatch(deletecargo({ dataDelete: response.data,cargos }))
   
}