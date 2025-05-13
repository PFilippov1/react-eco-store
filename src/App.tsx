import { Suspense } from 'react';
import MainLayout from './MainLayout/MainLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import { About } from './components/pages/About';
import { Contact } from './components/pages/Contact';
import ErrorBoundary from './lib/ErrorBoundary';

function App() {
  return (
    // <>
    //   <MainLayout />
    // </>
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              //todo
              {/* <Route path="cart" element={<Cart />} /> */}
              {/* <Route path="plant/:id" element={<Plant />} /> */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
