import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResultsPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`/api/products/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => setResults(data))
        .catch(() => alert("Kunde inte hämta sökresultat."));
    }
  }, [query]);

  return (
    <div className="container">
      <h1>Sökresultat för: "{query}"</h1>
      <div className="product-container">
        {results.length === 0 ? (
          <p>Inga produkter hittades.</p>
        ) : (
          results.map((product) => (
            <a key={product.id} href={`/products/${product.slug}`} className="product-card">
              {product.isNew && <div className="new-badge">Nyhet</div>}
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <p className="product-title">{product.name}</p>
                <p className="product-brand">{product.brand}</p>
                <p className="product-price">{product.price} SEK</p>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;