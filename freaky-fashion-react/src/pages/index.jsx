import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../public/stylesheets/style.css";

const HomePage = ({ title, products = [] }) => {
  useEffect(() => {
    document.title = title || "Freaky Fashion";
  }, [title]);

  return (
    <div className="container">
      <header>
        <a href="/">
          <img src="/public/images/FR.png" alt="freakyfashion logo" className="logo" />
        </a>
        <form className="search-form">
          <div className="search-container">
            <input
              type="text"
              name="q"
              placeholder="Sök produkt"
              className="search-input"
            />
            <button type="submit" className="search-button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>
        <a href="#" className="favorites-icon">
          <i className="fa-solid fa-heart"></i>
        </a>
        <a href="#" className="basket-icon">
          <i className="fa-solid fa-bag-shopping"></i>
        </a>
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
        <div className="hero-container">
          <img src="/images/pexels-pixabay-371160.jpg" alt="" className="heroplaceholder" />
          <div className="hero-text">
            <h1>Lorem, ipsum dolor.</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>

        <div className="image-grid">
          {["pexels-jonaorle-3828245.jpg", "pexels-callmehuyuno-347917.jpg", "pexels-ralph-rabago-3214683.jpg"].map((img, index) => (
            <a href="#" className="image-container" key={index}>
              <img src={`/images/${img}`} alt="" className="image-grid-image" />
              <div className="image-text">Lorem, ipsum dolor.</div>
            </a>
          ))}
        </div>

        <div className="product-container">
          {products.map((product, index) => (
            <a href={`/products/${product.slug}`} className="product-card" key={index}>
              {product.isNew && <div className="new-badge">Nyhet</div>}
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-favorite-icon">
                <i className="fa-regular fa-heart"></i>
              </div>
              <div className="product-info">
                <p className="product-title">
                  {product.name}
                  <span className="product-price">{product.price} SEK</span>
                </p>
                <p className="product-brand">{product.brand}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="info-container">
          <div className="info-item"><i className="fa-solid fa-earth-americas"></i><p>Gratis frakt och returer</p></div>
          <div className="info-item"><i className="fa-solid fa-jet-fighter"></i><p>Expressfrakt</p></div>
          <div className="info-item"><i className="fa-solid fa-shield-halved"></i><p>Säkra betalningar</p></div>
          <div className="info-item"><i className="fa-regular fa-face-smile"></i><p>Nyheter varje dag</p></div>
        </div>
      </main>

      <div className="accordion" id="accordionExample">
        {[
          {
            id: "Shopping",
            title: "Shopping",
            links: ["T-shirts", "Hoodies", "Toppar"]
          },
          {
            id: "MinaSidor",
            title: "Mina Sidor",
            links: ["Mitt konto", "Beställningar", "Returnera artikel"]
          },
          {
            id: "Kundtjanst",
            title: "Kundtjänst",
            links: ["Kontakta oss", "Köpvillkor", "Returpolicy"]
          }
        ].map(({ id, title, links }, i) => (
          <div className="accordion-item" key={id}>
            <h2 className="accordion-header" id={`heading${id}`}>
              <button
                className={`accordion-button ${i !== 0 ? "collapsed" : ""}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${id}`}
                aria-expanded={i === 0 ? "true" : "false"}
                aria-controls={`collapse${id}`}
              >
                {title}
              </button>
            </h2>
            <div
              id={`collapse${id}`}
              className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`}
              aria-labelledby={`heading${id}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <ul>
                  {links.map((text, index) => (
                    <li key={index}><a href="#">{text}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-section-wrapper">
        <div className="bottom-list-container">
          {[
            {
              id: "shoppingList",
              title: "Shopping",
              links: ["T-shirts", "Skor", "Hoodies"]
            },
            {
              id: "myPagesList",
              title: "Mina sidor",
              links: ["Mitt konto", "Beställningar", "Returnera artikel"]
            },
            {
              id: "customerServiceList",
              title: "Kundtjänst",
              links: ["Kontakta oss", "Köpvillkor", "Returpolicy"]
            }
          ].map(({ id, title, links }) => (
            <div className="bottom-list-section" id={id} key={id}>
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

export default HomePage;
