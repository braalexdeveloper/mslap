import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ isLogin, children, redirectTo = "/" }) => {
  if (!isLogin) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};
