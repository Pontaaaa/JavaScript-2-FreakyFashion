import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetailsPage = ({ products = [] }) => {
  const { slug } = useParams();

  const product = products.find((p) => p.slug === slug);
  const similarProducts = products.filter((p) => p.slug !== slug).slice(0, 6); // Example logic

  useEffect(() => {
    document.title = product?.name || "Freaky Fashion";
  }, [product]);

  if (!product) {
    return (
      <div className="container">
        <h2>Produkten kunde inte hittas</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <a href="/">
          <img src="/images/FR.PNG" alt="freakyfashion logo" className="logo" />
        </a>
        <form className="search-form">
          <div className="search-container">
            <input type="text" name="q" placeholder="Sök produkt" className="search-input" />
            <button type="submit" className="search-button">
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
        <div className="product-details-container">
          <div className="details-product-image-container">
            {product.isNew && <div className="new-badge">Nyhet</div>}
            <img src={product.image} alt={product.name} className="details-product-image" />
            <div className="details-favorite-icon">
              <i className="fa-solid fa-heart"></i>
            </div>
          </div>

          <div className="details-product-info">
            <h1 className="details-product-title">{product.name}</h1>
            <p className="details-product-brand">{product.brand}</p>
            <p className="details-product-description">{product.description}</p>
            <p className="details-product-price">{product.price} SEK</p>
            <button className="add-to-cart-button">Lägg i varukorg</button>
          </div>
        </div>

        {/* Carousel for similar products */}
        <div className="carousel-container">
          <h2>Liknande produkter</h2>
          <div id="carouselExample" className="carousel slide" data-bs-ride="false">
            <div className="carousel-inner">
              {Array.from({ length: Math.ceil(similarProducts.length / 3) }).map((_, i) => (
                <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                  <div className="row">
                    {similarProducts.slice(i * 3, i * 3 + 3).map((item, j) => (
                      <div key={j} className="col-md-4">
                        <a href={`/products/${item.slug}`} className="similar-product-card">
                          <img src={item.image} className="d-block w-100" alt={item.name} />
                          <div className="similar-product-info">
                            <span className="similar-product-title">{item.name}</span>
                            <span className="similar-product-price">{item.price} SEK</span>
                          </div>
                          <p className="similar-product-brand">{item.brand}</p>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="fa-solid fa-arrow-left" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="fa-solid fa-arrow-right" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Info Items */}
        <div className="info-container">
          <div className="info-item"><i className="fa-solid fa-earth-americas"></i><p>Gratis frakt och returer</p></div>
          <div className="info-item"><i className="fa-solid fa-jet-fighter"></i><p>Expressfrakt</p></div>
          <div className="info-item"><i className="fa-solid fa-shield-halved"></i><p>Säkra betalningar</p></div>
          <div className="info-item"><i className="fa-regular fa-face-smile"></i><p>Nyheter varje dag</p></div>
        </div>
      </main>

      {/* Accordion Section */}
      <div className="accordion" id="accordionExample">
        {[
          { id: "Shopping", title: "Shopping", links: ["T-shirts", "Hoodies", "Toppar"] },
          { id: "MinaSidor", title: "Mina Sidor", links: ["Mitt konto", "Beställningar", "Returnera artikel"] },
          { id: "Kundtjanst", title: "Kundtjänst", links: ["Kontakta oss", "Köpvillkor", "Returpolicy"] }
        ].map(({ id, title, links }, i) => (
          <div key={id} className="accordion-item">
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
                  {links.map((text, j) => (
                    <li key={j}><a href="#">{text}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bottom-section-wrapper">
        <div className="bottom-list-container">
          {[
            { id: "shoppingList", title: "Shopping", links: ["T-shirts", "Skor", "Hoodies"] },
            { id: "myPagesList", title: "Mina sidor", links: ["Mitt konto", "Beställningar", "Returnera artikel"] },
            { id: "customerServiceList", title: "Kundtjänst", links: ["Kontakta oss", "Köpvillkor", "Returpolicy"] }
          ].map(({ id, title, links }) => (
            <div key={id} className="bottom-list-section" id={id}>
              <h2>{title}</h2>
              <ul>
                {links.map((text, i) => (
                  <li key={i}><a href="#">{text}</a></li>
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

export default ProductDetailsPage;