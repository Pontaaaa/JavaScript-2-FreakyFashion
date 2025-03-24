import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminNewProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    brand: "",
    sku: "",
    price: "",
    publicationDate: "",
    slug: "",
  });

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
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await fetch("/admin/products/new", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Ett fel inträffade.");
      }

      const result = await res.json();
      alert(result.message);
      navigate("/admin/products"); // ✅ React-style navigation
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Namn" />
      {/* Repeat for other inputs... */}
      <button type="submit">Lägg till</button>
    </form>
  );
};

export default AdminNewProduct;