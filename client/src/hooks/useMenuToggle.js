import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvider';

const useMenuToggle = () => {
  return useContext(AuthContext);
}

export default useMenuToggle;
