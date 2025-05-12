import React from 'react';
import Header from '../components/Header';

const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content"></div>
    </div>
  );
};

export default MainLayout;
