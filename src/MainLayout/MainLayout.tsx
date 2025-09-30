import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuthCheck, useCartStorage } from '@/hooks';
import { AnimatePresence } from 'framer-motion';

const MainLayout: React.FC = () => {
  useCartStorage();
  useAuthCheck();
  return (
    <div className="wrapper">
      <ToastContainer />
      <Header />
      <main className="content">
        <AnimatePresence mode="wait" initial={false}>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MainLayout;
