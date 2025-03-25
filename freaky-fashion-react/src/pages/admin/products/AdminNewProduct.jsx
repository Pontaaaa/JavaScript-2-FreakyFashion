import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminNewProduct = ({ title = "Ny produkt" }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    brand: "",
    sku: "",
    price: "",
    publicationDate: "",
  });

  useEffect(() => {
    document.title = title;
  }, [title]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Något gick fel");
      }

      const result = await res.json();
      alert(result.message || "Produkten har lagts till!");

      // ✅ Redirect to admin products page
      navigate("/admin/products");
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
            <h2>Ny produkt</h2>
          </div>

          <div className="new-product-data">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <label htmlFor="name">Namn</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Namn"
                required
                maxLength="25"
                value={formData.name}
                onChange={handleChange}
              />

              <label htmlFor="description">Beskrivning</label>
              <textarea
                name="description"
                id="description"
                placeholder="Beskrivning"
                required
                value={formData.description}
                onChange={handleChange}
              ></textarea>

              <label htmlFor="image">Bild</label>
              <input
                type="file"
                name="image"
                id="image"
                accept=".png, .jpeg, .jpg"
                required
                onChange={handleChange}
              />

              <label htmlFor="brand">Märke</label>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Märke"
                required
                maxLength="20"
                value={formData.brand}
                onChange={handleChange}
              />

              <label htmlFor="sku">SKU</label>
              <input
                type="text"
                name="sku"
                id="sku"
                placeholder="SKU"
                required
                maxLength="10"
                pattern="^[A-Za-z]{3}\\d{3}$"
                title="Formatet ska vara XXXYYY. Exempel: AAA111"
                value={formData.sku}
                onChange={handleChange}
              />

              <label htmlFor="price">Pris</label>
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Pris"
                required
                maxLength="10"
                value={formData.price}
                onChange={handleChange}
              />

              <label htmlFor="publicationDate">Publiceringsdatum</label>
              <input
                type="date"
                name="publicationDate"
                id="publicationDate"
                required
                value={formData.publicationDate}
                onChange={handleChange}
              />

              <button type="submit">Lägg till</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminNewProduct;