import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './navBar'
import Footer from './footer'

const Layout = ({children}) => {
  return (
    <>
      {/* This Outlet is where child routes will be rendered */}
      <div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
