import React from "react";
import { Link } from "react-router-dom";
import useMenuToggle from "../hooks/useMenuToggle";

export const Footer = () => {
  const { menu } = useMenuToggle();
  return (
    <>
      <footer id="footer" className="footer" style={{ marginLeft: menu ? '' : '0px' }}>
        <div className="credits">
          <Link to="to:0998113580" className="contact-me mr-4">
            <i className="bi bi-phone">&nbsp;</i>
            <span>0998113580</span>
          </Link>&nbsp;&nbsp;
          <Link to="mailto:fnicolalde@mslaps.com" className="contact-me ml-4">
            <i className="bi bi-envelope-at">&nbsp;</i>
            <span>fnicolalde@mslaps.com</span>
          </Link>

        </div>
        <div className="copyright">
          &copy; Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
        </div>

      </footer>

      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

    </>
  );
};

