import "./RecommendedProduct.css";
import StarRating from "./StarRating";
import { Button } from "primereact/button";
import { Product as ProductType } from "../types";

function RecommendedProduct({ product }: { product: ProductType }) {
  return (
    <div className="recommended-product" key={product.name}>
      <img
        className="recommended-product__image"
        src={`${product.image}${product.price}`}
        alt=""
      />
      <footer className="recommended-product__footer">
        <h3 className="recommended-product__title">{product.name}</h3>
        <StarRating rating={product.rating} />
        <p className="recommended-product__description">
          {product.description}
        </p>
        <Button label="More info" icon="pi pi-info-circle" />
      </footer>
    </div>
  );
}

export default RecommendedProduct;
