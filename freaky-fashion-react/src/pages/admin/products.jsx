import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./admin.css";

const AdminProductList = ({ title = "Produkter" }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Kunde inte hämta produkter");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <div>
      <header>
        <div className="admin-header">
          <h1>{title}</h1>
        </div>
      </header>

      <div className="admin-container">
        <aside className="admin-menu">
          <nav>
            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="/admin/products">Produkter</a></li>
              <li><a href="#">Orderhantering</a></li>
              <li><a href="#">Analysdata</a></li>
              <li><a href="#">Inställningar</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </nav>
        </aside>

        <main className="admin-content">
          <div className="content-header">
            <h2>Produkter</h2>
            <div className="button-group">
              <button onClick={fetchProducts} className="load-products-button">
                Ladda produkter
              </button>
              <Link to="/admin/products/new" className="new-product-button">
                Ny produkt
              </Link>
            </div>
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
                  <td colSpan="4">Inga produkter inlästa</td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.price} SEK</td>
                    <td>
                      <Link to={`/products/${product.slug}`} className="details-link">
                        Visa
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default AdminProductList;