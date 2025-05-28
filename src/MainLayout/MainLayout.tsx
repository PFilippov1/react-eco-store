import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { useCartStorage } from '../hooks/useCartStorage';
import { ToastContainer } from 'react-toastify';

const MainLayout: React.FC = () => {
  useCartStorage();
  return (
    <div className="wrapper">
      <ToastContainer />
      <Header />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
