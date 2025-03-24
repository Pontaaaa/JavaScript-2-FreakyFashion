import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/index";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AdminNewProduct from "./pages/admin/products/AdminNewProduct";
import { Index } from "solid-js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<index />} />
        <Route path="/products/:slug" element={<ProductDetailsPage />} />
        <Route path="/admin/products/new" element={<AdminNewProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
