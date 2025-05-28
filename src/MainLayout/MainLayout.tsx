import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuthCheck, useCartStorage } from '@/hooks';

const MainLayout: React.FC = () => {
  useCartStorage();
  useAuthCheck();
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
