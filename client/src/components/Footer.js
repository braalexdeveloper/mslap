import React from 'react'
import useMenuToggle from '../hooks/useMenuToggle'

export const Footer = () => {
  const {menu}=useMenuToggle();
  return (
    <>
    <footer id="footer" className="footer" style={{  marginLeft: menu ? '': '0px' }}>
    <div className="copyright">
      &copy; Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
    </div>
    <div className="credits">
      
      Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
    </div>
  </footer>

  <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
  
  </>
  )
}
