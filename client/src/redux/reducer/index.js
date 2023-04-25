import {
    ALL_CARGOS,
    CREATE_CARGO,
    DELETE_CARGO,
    UPDATE_CARGO,
    ALL_PROJECTS,
    CREATE_PROJECT,
    DELETE_PROJECT,
    UPDATE_PROJECT,
    CREATE_USER,
    ALL_USERS,
    DELETE_USER, UPDATE_USER
} from "../actions";

const initialState = {
    cargos: [],
    createCargo: {},
    updateCargo: {},
    projects: [],
    createProject: {},
    deleteProject: {},
    updateProject: {},
    users: [],
    createUser: {},
    deleteUser: {},
    updateUser: {},
    contratistas: [],
    supervisores: [],
    operarios: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_CARGOS:
            return {
                ...state,
                cargos: action.payload
            }
        case CREATE_CARGO:
            return {
                ...state,
                createCargo: action.payload
            }
        case UPDATE_CARGO:
            return {
                ...state,
                updateCargo: action.payload
            }
        case DELETE_CARGO:
            return {
                ...state,
                cargo: action.payload,
                cargos: state.cargos.filter(el => el.id !== action.id)
            }
        case ALL_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case CREATE_PROJECT:
            return {
                ...state,
                createProject: action.payload
            }
        case DELETE_PROJECT:
            return {
                ...state,
                deleteProject: action.payload,
                projects: state.projects.filter(el => el.id !== action.id)
            }
        case UPDATE_PROJECT:
            return {
                ...state,
                updateProject: action.payload,
            }
        case CREATE_USER:
            return {
                ...state,
                createUser: action.payload,
                users: action.allUsers,
                contratistas: action.allContratistas,
                supervisores: action.allSupervisores
            }
        case ALL_USERS:
            return {
                ...state,
                users: action.payload,
                contratistas: action.allContratistas,
                supervisores: action.allSupervisores
            }
        case DELETE_USER:
            return {
                ...state,
                deleteUser: action.payload,
                users: state.users.filter(el => el.id !== action.id),
                contratistas: state.contratistas.filter(el => el.id !== action.id),
                supervisores: state.supervisores.filter(el => el.id !== action.id)
            }
        case UPDATE_USER:
            return {
                ...state,
                updateUser: action.payload,
            }
        default:
            return state
    }
}

export default rootReducer;