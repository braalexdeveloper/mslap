import React from "react";
import { Dashboard } from "./components/Dashboard";
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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard/projects" element={<Projects />} />
        <Route path="/dashboard/cargos" element={<Cargos />} />
        <Route path="/dashboard/supervisores" element={<Supervisores />} />
        <Route path="/dashboard/contratistas" element={<Contratistas />} />
        <Route path="/dashboard/operarios" element={<Operarios />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/generateqr" element={<GenerarQR />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
