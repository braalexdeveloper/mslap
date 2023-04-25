import axios from "axios";

const baseUrl = process.env.REACT_APP_API || 'http://localhost:3001';

export const ALL_CARGOS = 'ALL_CARGOS';
export const CREATE_CARGO = 'CREATE_CARGO';
export const DELETE_CARGO = 'DELETE_CARGO';
export const UPDATE_CARGO = 'UPDATE_CARGO';
export const ALL_PROJECTS = 'ALL_PROJECTS';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const CREATE_USER = 'CREATE_USER';
export const ALL_USERS = 'ALL_USERS';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const AllCargos = () => async (dispatch) => {
    const response = await axios.get(baseUrl + '/api/admin/positions');
   let cargos = new Set(response.data.data.map(el => {
        return {
            id: el.id,
            name: el.name
        }
    }).map(JSON.stringify));
  

   
    return dispatch({
        type: ALL_CARGOS,
        payload:Array.from(cargos).map(JSON.parse)
    })
}

export const createCargo = (cargo) => async (dispatch) => {
    const response = await axios.post(baseUrl + '/api/admin/position', cargo);

    return dispatch({
        type: CREATE_CARGO,
        payload: response.data
    })
}

export const updateCargo = (id, info) => async (dispatch) => {
    const response = await axios.put(baseUrl + '/api/admin/position/' + id, info);


    return dispatch({
        type: UPDATE_CARGO,
        payload: response.data
    })
}

export const deleteCargo = (id) => async (dispatch) => {
    const response = await axios.delete(baseUrl + '/api/admin/position/' + id);

    return dispatch({
        type: DELETE_CARGO,
        payload: response.data,
        id: id
    })
}

//Projects

export const allProjects = () => async (dispatch) => {
    const response = await axios.get(baseUrl + '/api/admin/projects');
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
    dispatch({
        type: ALL_PROJECTS,
        payload: projects
    })
}

export const createProject = (project) => async (dispatch) => {
    const response = await axios.post(baseUrl + '/api/admin/project', project);

    return dispatch({
        type: CREATE_PROJECT,
        payload: response.data
    })
}

export const deleteProject = (id) => async (dispatch) => {
    const response = await axios.delete(baseUrl + '/api/admin/project/' + id);

    return dispatch({
        type: DELETE_PROJECT,
        payload: response.data,
        id: id
    })
}

export const updateProject = (id, info) => async (dispatch) => {
    const response = await axios.put(baseUrl + '/api/admin/project/' + id, info);

    return dispatch({
        type: UPDATE_PROJECT,
        payload: response.data
    })
}

//CONTRISTAS

export const allUsers = () => async (dispatch) => {
    const response = await axios.get(baseUrl + '/api/admin/users');
    const contratistas = response.data.data.filter(el => el.role.value === "contratista");
    const supervisores = response.data.data.filter(el => el.role.value === "supervisor");
    const operarios = response.data.data.filter(el => el.role.value === "operario");

    return dispatch({
        type: ALL_USERS,
        payload: response.data.data,
        allContratistas: contratistas,
        allSupervisores: supervisores,
        allOperarios: operarios
    })
}

export const createUser = (info) => async (dispatch) => {
    const response = await axios.post(baseUrl + '/api/admin/user', info);
    const users = await axios.get(baseUrl + '/api/admin/users');
    const contratistas = users.data.data.filter(el => el.role.value === "contratista");
    const supervisores = users.data.data.filter(el => el.role.value === "supervisor");
    const operarios = users.data.data.filter(el => el.role.value === "operario");

    return dispatch({
        type: CREATE_USER,
        payload: response.data,
        allUsers: users.data.data,
        allContratistas: contratistas,
        allSupervisores: supervisores,
        allOperarios: operarios
    })
}

export const deleteUser = (id) => async (dispatch) => {
    const response = await axios.delete(baseUrl + '/api/admin/user/' + id);

    return dispatch({
        type: DELETE_USER,
        payload: response.data,
        id: id
    })
}

export const updateUser = (id, info) => async (dispatch) => {
    const response = await axios.put(baseUrl + '/api/admin/user/' + id, info);

    return dispatch({
        type: UPDATE_USER,
        payload: response.data
    })
}