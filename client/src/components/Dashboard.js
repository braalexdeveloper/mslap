import React from 'react'

import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';


export const Dashboard = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">

        <section className="section dashboard">
        dashboard
          
        </section>

      </main>
      <Footer />
    </>
  )
}
