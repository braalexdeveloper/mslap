import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useMenuToggle from "../../hooks/useMenuToggle";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { FormChangeImage } from "../changeImage/FormChangeImage";
import { FormChangePassword } from "../changePassword/FormChangePassword";
import { Footer } from "../Footer";
import { userSelector } from "../../slices/user/userSlice";
import { url_api } from "../../utils/config";

export const Profile = () => {
  const { menu } = useMenuToggle();
  const { user } = useSelector(userSelector);

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
          <h1>Perfil</h1>
        </div>
        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    src={`${url_api}/${user?.image}`}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <h2 className="text-capitalize">{`${user?.name} ${user?.lastName}`}</h2>
                  <h3 className="text-capitalize">{user?.role?.value}</h3>
                  <div className="social-links mt-2">
                    <Link to="#" className="twitter">
                      <i className="bi bi-twitter"></i>
                    </Link>
                    <Link to="#" className="facebook">
                      <i className="bi bi-facebook"></i>
                    </Link>
                    <Link to="#" className="instagram">
                      <i className="bi bi-instagram"></i>
                    </Link>
                    <Link to="#" className="linkedin">
                      <i className="bi bi-linkedin"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        Editar Perfil
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                      >
                        Cambiar Contraseña
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <FormChangeImage />
                    <FormChangePassword />
                  </div>
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
