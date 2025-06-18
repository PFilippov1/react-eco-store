import { Suspense } from 'react';
import MainLayout from './MainLayout/MainLayout';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import NotFound from './pages/NotFound';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import ErrorBoundary from './lib/ErrorBoundary';
import { Cart } from './pages/Cart';
import { Favorite } from './pages/Favorite';
import { ShowProduct } from './components/ShowProduct';
import { useLocation } from 'react-router-dom';
import { ProductModal } from './components/shared';

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  // const backgroundLocation = state?.backgroundLocation;
  const backgroundLocation =
    location.state && 'backgroundLocation' in location.state ? state.backgroundLocation : null;

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/product/:id" element={<ShowProduct />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

        {backgroundLocation && (
          <Routes>
            <Route path="/product/:id" element={<ProductModal />} />
          </Routes>
        )}
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
