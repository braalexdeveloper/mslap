import React from "react";
import { Link } from "react-router-dom";
import useMenuToggle from "../hooks/useMenuToggle";

export const Footer = () => {
  const { menu } = useMenuToggle();

  return (
    <>
      <footer
        id="footer"
        className="footer d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top text-center footer mb-5"
        style={{ marginLeft: menu ? "" : "0px" }}
      >
        <div className="text-center">
        <div className="col">
            <Link to="to:0998113580" className="contact-me">
              <i className="bi bi-phone">&nbsp;</i>
              <span>0998113580</span>
            </Link>
          </div>
          <div className="col copyright">
            &copy; Copyright&nbsp;
            <span className="fw-bold">MSLAPS</span>. Todos los Derechos
            Reservados
          </div>
          <div className="col">
            <Link to="mailto:fnicolalde@mslaps.com" className="contact-me">
              <i className="bi bi-envelope-at">&nbsp;</i>
              <span>fnicolalde@mslaps.com</span>
            </Link>
          </div>
        </div>
      </footer>
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};
