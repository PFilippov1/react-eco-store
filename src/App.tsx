import { Suspense } from 'react';
import MainLayout from './MainLayout/MainLayout';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import { About } from './components/pages/About';
import { Contact } from './components/pages/Contact';
import ErrorBoundary from './lib/ErrorBoundary';
import { Cart } from './components/pages/Cart';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            //todo
            {/* <Route path="cart" element={<Cart />} /> */}
            {/* <Route path="plant/:id" element={<Plant />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
