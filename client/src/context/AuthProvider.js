import { createContext, useState } from "react";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [menu,setMenu]=useState(true);

    return(
       <AuthContext.Provider value={{menu,setMenu}}>
        {children}
       </AuthContext.Provider> 
    )
}

export default AuthContext;