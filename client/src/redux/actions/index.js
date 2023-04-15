import axios from "axios";

const baseUrl=process.env.REACT_APP_API || 'http://localhost:3001';

export const ALL_CARGOS='ALL_CARGOS';
export const CREATE_CARGO='CREATE_CARGO';
export const DELETE_CARGO='DELETE_CARGO';
export const UPDATE_CARGO='UPDATE_CARGO';
export const ALL_PROJECTS='ALL_PROJECTS';
export const CREATE_PROJECT='CREATE_PROJECT';
export const DELETE_PROJECT='DELETE_PROJECT';
export const UPDATE_PROJECT='UPDATE_PROJECT';

export const AllCargos=()=>async (dispatch)=>{
   const response=await axios.get(baseUrl+'/api/admin/positions');
   return dispatch({
    type:ALL_CARGOS,
    payload:response.data.data
   })
}

export const createCargo=(cargo)=>async(dispatch)=>{
 const response=await axios.post(baseUrl+'/api/admin/position',cargo);

return dispatch({
    type:CREATE_CARGO,
    payload:response.data
})
}

export const updateCargo=(id,info)=>async(dispatch)=>{
    const response=await axios.put(baseUrl+'/api/admin/position/'+id,info);

   
   return dispatch({
       type:UPDATE_CARGO,
       payload:response.data
   })
   }

export const deleteCargo=(id)=>async(dispatch)=>{
    const response=await axios.delete(baseUrl+'/api/admin/position/'+id);
  
    return dispatch({
        type:DELETE_CARGO,
        payload:response.data,
        id:id
    })
}

//Projects

export const allProjects=()=>async(dispatch)=>{
 const response=await axios.get(baseUrl+'/api/admin/projects');
 let projects=response.data.data.map(el=>{
    let fechaStart=el.dateStart.split('T');
        let fechaEnd=el.dateEnd.split('T');

        return {
            id: el.id,
            name:el.name,
            dateStart: fechaStart[0].split('-').reverse().join('-'),
            dateEnd:fechaEnd[0].split('-').reverse().join('-'),
            totalCertificates: el.totalCertificates,
            location:el.location,
            users:el.users
        }
 })
 dispatch({
    type:ALL_PROJECTS,
    payload:projects
 })
}

export const createProject=(project)=>async(dispatch)=>{
    const response=await axios.post(baseUrl+'/api/admin/project',project);
   
   return dispatch({
       type:CREATE_PROJECT,
       payload:response.data
   })
   }

   export const deleteProject=(id)=>async(dispatch)=>{
    const response=await axios.delete(baseUrl+'/api/admin/project/'+id);
  
    return dispatch({
        type:DELETE_PROJECT,
        payload:response.data,
        id:id
    })
}

export const updateProject=(id,info)=>async(dispatch)=>{
    const response=await axios.put(baseUrl+'/api/admin/project/'+id,info);
    
   return dispatch({
       type:UPDATE_PROJECT,
       payload:response.data
   })
   }