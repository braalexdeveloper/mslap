import {
    ALL_CARGOS,
    CREATE_CARGO,
    DELETE_CARGO,
    UPDATE_CARGO,
    ALL_PROJECTS,
    CREATE_PROJECT,
    DELETE_PROJECT,
    UPDATE_PROJECT
} from "../actions";

const initialState = {
    cargos: [],
    createCargo: {},
    updateCargo: {},
    projects: [],
    createProject: {},
    deleteProject: {},
    updateProject: {},
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
            case  UPDATE_PROJECT:
                return {
                    ...state,
                    updateProject: action.payload,
                      }
        default:
            return state
    }
}

export default rootReducer;