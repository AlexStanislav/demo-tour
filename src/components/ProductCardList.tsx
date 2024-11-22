import "./ProductCardList.css";
import { Product as ProductType } from "../types";
import StarRating from "./StarRating";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { ModalConsumer } from "../ModalContext";

function ProductCardList({ product }: { product: ProductType }) {
    const { openModal } = ModalConsumer();

    function handleOpenModal() {
        openModal(product);
    }
    return (
        <div className="product-card-list">
            <img className="product-card-list__image" src={`${product.image}${product.price}`} alt={product.name} />
            <div className="product-card-list__content">
                <h3 className="product-card-list__title">
                    {product.name}
                    <img className="product-card-list__flag" src={`https://flagcdn.com/w40/${product.country_code.toLowerCase()}.png`} alt="" />
                </h3>
                <StarRating rating={product.rating} />
                <p className="product-card-list__description">{product.description}</p>
                <div className="p-inputgroup product-card-list__price">
                    <Button label="More info" icon="pi pi-info-circle" onClick={handleOpenModal}/>
                    <InputNumber value={product.price} readOnly />
                    <span className="p-inputgroup-addon">$</span>
                </div>
            </div>
        </div>
    );
}

export default ProductCardList;