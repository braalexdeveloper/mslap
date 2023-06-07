import React from "react";
import { Contratistas } from "./components/contratistas/Contratistas";
import { Operarios } from "./components/operarios/Operarios";
import { Login } from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import { Supervisores } from "./components/supervisores/Supervisores";
import { Projects } from "./components/projects/Projects";
import { Cargos } from "./components/cargos/Cargos";
import { Profile } from "./components/profile/Profile";
import { GenerarQR } from "./components/generarQR/GenerarQR";
import { NotFound } from "./components/notfound/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { userSelector } from "./slices/user/userSlice";
import { useSelector } from "react-redux";
import { Certificates } from "./components/certificates/Certificates";
import { CertificatesUser } from "./components/certificates/CertificatesUser";

function App() {
  const { user, isLogin } = useSelector(userSelector);
  return (
    <div className="App" id="appbg">
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route element={<ProtectedRoute isLogin={isLogin} />}>
          <Route path="/dashboard/operarios" element={<Operarios />} />
          <Route path="/dashboard/certificates" element={<Certificates />} />
          <Route
            path="/dashboard/certificates/:idUser"
            element={<CertificatesUser />}
          />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/generateqr" element={<GenerarQR />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              isLogin={isLogin && user.role?.value === "admin"}
              redirectTo="/dashboard/operarios"
            />
          }
        >
          <Route path="/dashboard/projects" element={<Projects />} />
          <Route path="/dashboard/cargos" element={<Cargos />} />
          <Route path="/dashboard/supervisores" element={<Supervisores />} />
          <Route path="/dashboard/contratistas" element={<Contratistas />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
