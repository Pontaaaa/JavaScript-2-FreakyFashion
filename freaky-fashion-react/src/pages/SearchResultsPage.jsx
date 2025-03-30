import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState(query || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      fetch(`/api/products/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch(() => alert("Kunde inte hämta sökresultat."));
    }
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="container">
      <header>
        <a href="/">
          <img src="/images/FR.PNG" alt="freakyfashion logo" className="logo" />
        </a>

        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-wrapper">
            <input
              type="text"
              name="q"
              placeholder="Sök produkt"
              className="search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="search-icon-button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>

        <a href="#" className="favorites-icon"><i className="fa-solid fa-heart"></i></a>
        <a href="#" className="basket-icon"><i className="fa-solid fa-bag-shopping"></i></a>

        <nav>
          <ul>
            <li><a href="#">Nyheter</a></li>
            <li><a href="#">Kategorier</a></li>
            <li><a href="#">Topplistan</a></li>
            <li><a href="#">Rea</a></li>
            <li><a href="#">Kampanjer</a></li>
          </ul>
        </nav>
      </header>

      <main>
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

        <div className="info-container">
          <div className="info-item"><i className="fa-solid fa-earth-americas"></i><p>Gratis frakt och returer</p></div>
          <div className="info-item"><i className="fa-solid fa-jet-fighter"></i><p>Expressfrakt</p></div>
          <div className="info-item"><i className="fa-solid fa-shield-halved"></i><p>Säkra betalningar</p></div>
          <div className="info-item"><i className="fa-regular fa-face-smile"></i><p>Nyheter varje dag</p></div>
        </div>
      </main>

      <div className="bottom-section-wrapper">
        <div className="bottom-list-container">
          {[
            { id: "shoppingList", title: "Shopping", links: ["T-shirts", "Skor", "Hoodies"] },
            { id: "myPagesList", title: "Mina sidor", links: ["Mitt konto", "Beställningar", "Returnera artikel"] },
            { id: "customerServiceList", title: "Kundtjänst", links: ["Kontakta oss", "Köpvillkor", "Returpolicy"] },
          ].map(({ id, title, links }) => (
            <div key={id} className="bottom-list-section" id={id}>
              <h2>{title}</h2>
              <ul>
                {links.map((text, index) => (
                  <li key={index}><a href="#">{text}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <footer className="footer">
          <p>© 2024 Freaky Fashion</p>
        </footer>
      </div>
    </div>
  );
};

export default SearchResultsPage;