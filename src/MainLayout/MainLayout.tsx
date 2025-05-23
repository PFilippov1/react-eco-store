import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { useCartStorage } from '../hooks/useCartStorage';

const MainLayout: React.FC = () => {
  useCartStorage();
  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
