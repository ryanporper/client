import './App.css';

import { Link, Navigate, Route, Routes } from 'react-router-dom';

import { AllProducts } from './views/Products';
import { OneProduct } from './views/OneProduct';
import { EditProduct } from './views/EditProduct';

function App() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top justify-content-center mb-4">
        <h1 className="navbar-brand mb-0">Product Manager</h1>
        <div className="navbar-nav justify-content-between">
          <Link
            to="/products"
            className="btn btn-sm btn-outline-primary mx-1"
          >
            All Products
          </Link>
        </div>
      </nav>
            
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        <Route path="/products/:id" element={<OneProduct />} />
      </Routes>
    </div>
  );
}

export default App;