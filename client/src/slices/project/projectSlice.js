import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    projects: [],
    create: {},
    update: {},
    delete: {}
}
const URL_API = "http://localhost:3001/api";

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        allProjects: (state, action) => {
            state.projects = action.payload.dataProjects
        },
        create: (state, action) => {
            state.create = action.payload.dataCreate
            state.projects=action.payload.projects
        },
        update: (state, action) => {
            state.update = action.payload.dataUpdate
            state.projects=action.payload.projects
        },
        deleteproject: (state, action) => {
            state.delete = action.payload.dataDelete
            state.projects=action.payload.projects
        }
    }
})

const { allProjects, create, update, deleteproject } = projectSlice.actions;

//Projects
const Projects = async () => {
    const response = await axios.get(URL_API + '/admin/projects');
    let projects = response.data.data.map(el => {
        let fechaStart = el.dateStart.split('T');
        let fechaEnd = el.dateEnd.split('T');

        return {
            id: el.id,
            name: el.name,
            dateStart: fechaStart[0].split('-').reverse().join('-'),
            dateEnd: fechaEnd[0].split('-').reverse().join('-'),
            totalCertificates: el.totalCertificates,
            location: el.location,
            users: el.users
        }
    })

    return projects;
}

export const getAllProjects = () => async (dispatch) => {
    let dataProjects = await Projects();
    dispatch(allProjects({ dataProjects }))
}

export const createProject = (project) => async (dispatch) => {
    const response = await axios.post(URL_API + '/admin/project', project);
    let projects = await Projects();
    return dispatch(create({ dataCreate: response.data,projects }))
}


export const updateProject = (id, info) => async (dispatch) => {
    const response = await axios.put(URL_API + '/admin/project/' + id, info);
    let projects = await Projects();
    return dispatch(update({ dataUpdate: response.data,projects }))
}

export const deleteProject = (id) => async (dispatch) => {
    const response = await axios.delete(URL_API + '/admin/project/' + id);
    let projects=await Projects();
    return dispatch(deleteproject({ dataDelete: response.data,projects }))
}