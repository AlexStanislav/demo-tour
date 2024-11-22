import { InputNumber } from "primereact/inputnumber";
import "./ProductCard.css";
import StarRating from "./StarRating";
import { Button } from "primereact/button";
import { Product as ProductType } from "../types";
import { ModalConsumer } from "../ModalContext";

function ProductCard({ product }: { product: ProductType }) {
  const { openModal } = ModalConsumer();

  function handleOpenModal() {
    openModal(product);
  }
  return (
    <div className="product-card">
      <div className="product-card__image">
        <img
          src={`${product.image}${product.price}`}
          alt={product.name}
          className="product-card__image"
        />
      </div>
      <header className="product-card__header">
        <h3 className="product-card__title">{product.name}</h3>
        <img
          className="product-card__flag"
          src={`https://flagcdn.com/24x18/${product.country_code.toLowerCase()}.png`}
          alt="Ukraine"
        />
        <StarRating rating={product.rating} />
      </header>
      <main className="product-card__main">
        <p className="product-card__description">
          {product.description.slice(0, 80)}...
        </p>
      </main>
      <footer className="product-card__footer">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">$</span>
          <InputNumber value={product.price} readOnly />
        </div>
        <Button label="More info" icon="pi pi-info-circle" onClick={handleOpenModal} />
      </footer>
    </div>
  );
}

export default ProductCard;
