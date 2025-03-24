import { useState } from "react";
import { useEffect } from "react";
import "./admin.css";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/admin/products/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      alert("Kunde inte hämta produkter.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Vill du verkligen ta bort produkten?");
    if (!confirmDelete) return;

    try {
      await fetch(`/admin/products/api/products/${productId}`, {
        method: "DELETE",
      });

      // Remove product from local state
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      alert("Kunde inte ta bort produkten.");
    }
  };

  return (
    <div>
      <h2>Produkter</h2>
      <div className="button-group">
        <button onClick={fetchProducts} className="load-products-button">
          {loading ? "Laddar..." : "Ladda produkter"}
        </button>
      </div>

      <table className="product-data-table">
        <thead>
          <tr>
            <th>Namn</th>
            <th>SKU</th>
            <th>Pris</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4">Inga produkter</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.price}</td>
                <td>
                  <a href="#" className="edit-icon">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </a>
                  <a
                    href="#"
                    className="trash-icon"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(product.id);
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;