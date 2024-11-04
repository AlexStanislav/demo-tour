import "./HomeView.css";
import Product from "../components/ProductCard";
import MobileHomeForm from "../components/MobileHomeForm";
import { useEffect, useState } from "react";
import { Product as ProductType } from "../types";
import RecommendedProduct from "../components/RecommendedProduct";
import DesktopHomeForm from "../components/DesktopHomeForm";

function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetch("/MOCK_DATA.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const popularProducts = products.slice(0, 8);
  const recommendedProducts = products.slice(4, 6);
  const detailsProducts = products.slice(10, 20);

  const [detailProduct, setDetailProduct] = useState<ProductType>();

  const initialProduct: ProductType = detailsProducts[0];

  const openDetails = (product: ProductType) => {
    const detailsElements = document.querySelectorAll(".details__item");
    detailsElements.forEach((element) => {
      element.classList.remove("details__item--active");
    });

    const detailElement = document.querySelector(
      `.details__item[data-id="${product.name}"]`
    );
    detailElement?.classList.add("details__item--active");

    setDetailProduct(product);
  };

  return (
    <section className="home">
      <section className="image-wrapper">
        <div className="image"></div>
        <div className="image-wrapper__text">
          <h1>Tour Demo</h1>
          <p>Discover your next adventure!</p>
        </div>
        <MobileHomeForm products={products} />
        <DesktopHomeForm products={products} />
      </section>

      <section className="recommended">
        <h2 className="title recommended__title">Recommended</h2>
        <section className="recommended__products">
          {recommendedProducts.map((product) => (
            <RecommendedProduct product={product} key={product.name} />
          ))}
        </section>
      </section>

      <section className="popular">
        <h2 className="title popular__title">Popular Destinations</h2>
        <section className="popular__products">
          {popularProducts.map((product) => (
            <Product
              product={product}
              key={`${product.name}${product.price}`}
            />
          ))}
        </section>
      </section>
      <section className="details">
        <div className="image"></div>
        <h2 className="title details__title">
          Check out new and exciting destinations!
        </h2>
        <div className="details__content">
          <nav className="details__nav">
            <ul className="list">
              {detailsProducts.map((product) => (
                <li
                  className="list__item details__item"
                  key={product.name}
                  data-id={product.name}
                  onClick={() => openDetails(product)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          </nav>
          <div className="details__product">
            {detailProduct
              ? detailProduct && <RecommendedProduct product={detailProduct} />
              : initialProduct && (
                  <RecommendedProduct product={initialProduct} />
                )}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Home;
