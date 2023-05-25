import React from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";

import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { Footer } from "../Footer";
import useMenuToggle from "../../hooks/useMenuToggle";
import { userSelector } from "../../slices/user/userSlice";

const NA = "NA";

export const GenerarQR = () => {
  const { menu } = useMenuToggle();
  const { status, user } = useSelector(userSelector);
  const info = `
  DNI: ${user?.dni || NA}
  Nombre: ${user?.name || NA}
  Apellido: ${user?.lastName || NA}
  Fecha de Cumpleaños: ${user?.birthday || NA}
  Tipo de Sangre: ${user?.typeBlood || NA}
  Teléfono: ${user?.phone || NA}
  Contacto de Emergencia: ${user?.contactEmergency || NA}
  Teléfono de Emergencia: ${user?.phoneEmergency || NA}
  Correo: ${user?.email || NA}
  Sueldo: ${user?.salary || NA}
  `
  return (
    <>
      <Header />
      <Sidebar />
      <main
        id="main"
        className="main"
        style={{ marginLeft: menu ? "" : "0px" }}
      >
        <div className="pagetitle">
          <h1>Código QR</h1>
        </div>
        <section className="section profile">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h2>Información del Usuario</h2>
                </div>
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  {!user ? (
                    <div>Cargando...</div>
                  ) : status ? (
                    <div className="text-center">
                      <QRCode value={info} textLength={250} />
                      <h2>Escanee el siguiente código QR</h2>
                    </div>
                  ) : (
                    <div>Falló al cargar la información del usuario</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
