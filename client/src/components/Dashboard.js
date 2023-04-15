import React from "react";
import useMenuToggle from "../hooks/useMenuToggle";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";

export const Dashboard = () => {

  const {menu}=useMenuToggle();
  return (
    <>
      <Header/>
      <Sidebar/>
      <main id="main" className="main" style={{  marginLeft: menu ? '': '0px' }}>

        <section className="section dashboard">
        dashboard
          
        </section>

      </main>
      <Footer />
    </>
  );
};
