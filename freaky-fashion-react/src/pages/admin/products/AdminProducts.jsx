import { useEffect, useState } from "react";
import "./admin.css";

const AdminProducts = ({ title = "Produkter" }) => {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setLoaded(true);
    } catch (error) {
      alert("Kunde inte hämta produkter.");
    }
  };

  const handleDelete = async (productId) => {
    const confirmed = confirm("Vill du verkligen ta bort produkten?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      } else {
        throw new Error("Kunde inte ta bort produkten.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

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
                {loaded ? "Uppdatera produkter" : "Ladda produkter"}
              </button>
              <a href="/admin/products/new" className="new-product-button">
                Ny produkt
              </a>
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
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.price} SEK</td>
                  <td>
                    <a href="#" className="edit-icon">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </a>
                    <a
                      href="#"
                      className="trash-icon"
                      onClick={() => handleDelete(product.id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </a>
                  </td>
                </tr>
              ))}
              {products.length === 0 && loaded && (
                <tr>
                  <td colSpan="4">Inga produkter hittades.</td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default AdminProducts;