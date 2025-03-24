import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/index";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AdminNewProduct from "./pages/admin/products/AdminNewProduct";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Fel vid hämtning av produkter:", err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage products={products} title="Freaky Fashion" />} />
        <Route path="/products/:slug" element={<ProductDetailsPage />} />
        <Route path="/admin/products/new" element={<AdminNewProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;