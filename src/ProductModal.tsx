import { Dialog } from "primereact/dialog";
import { Product } from "./types";
import "./ProductModal.css";
import StarRating from "./components/StarRating";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faHotel,
  faRoute,
  faCity,
  faGlobe,
  faVolleyball,
  faComputer,
  faBowlingBall,
  faDumbbell,
  faBowlFood,
  faSwimmingPool,
  faSpa,
  faBook,
  faFilm,
  faMicrophone,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "primereact/button";
import ProductBooking from "./components/ProductBooking";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData: Product;
}

const amenity_icons: { [key: string]: IconDefinition } = {
  playground: faVolleyball,
  arcade: faComputer,
  "bowling alley": faBowlingBall,
  gym: faDumbbell,
  restaurant: faBowlFood,
  pool: faSwimmingPool,
  spa: faSpa,
  library: faBook,
  cinema: faFilm,
  karaoke: faMicrophone,
};

function ProductModal({ isOpen, onClose, productData }: ModalProps) {
  const {
    image,
    name,
    price,
    description,
    category,
    rating,
    country,
    country_code,
    city,
    amenity_type,
  } = productData;

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <Dialog
      visible={isOpen}
      onHide={onClose}
      header="Product Details"
      className="product-modal__dialog"
    >
      {isBookingOpen === false ? (
        <div className="product-modal">
          <img
            className="product-modal__image"
            src={`${image}${price}`}
            alt={name}
          />
          <div className="product-modal__content">
            <h2 className="product-modal__title">
              {name}
              <img
                className="product-modal__flag"
                src={`https://flagcdn.com/24x18/${country_code.toLowerCase()}.png`}
                alt=""
              />
            </h2>
            <StarRating rating={rating} />
            <p className="product-modal__description">{description}</p>
            <div className="product-modal__info">
              <ul className="product-modal__amenities">
                <li className="product-modal__list-title">Amenities</li>
                {amenity_type.map((amenity) => (
                  <li className="product-modal__amenity" key={amenity}>
                    <FontAwesomeIcon icon={amenity_icons[amenity]} />
                    {_.capitalize(amenity)}
                  </li>
                ))}
              </ul>
              <ul className="product-modal__details">
                <li className="product-modal__list-title">
                  Geographical Information
                </li>
                <li className="product-modal__detail">
                  <FontAwesomeIcon
                    icon={category === "hotel" ? faHotel : faRoute}
                  />
                  {_.capitalize(category)}
                </li>
                <li className="product-modal__detail">
                  <FontAwesomeIcon icon={faCity} />
                  {city}
                </li>
                <li className="product-modal__detail">
                  <FontAwesomeIcon icon={faGlobe} />
                  {country}
                </li>
              </ul>
            </div>
            <footer className="product-modal__footer">
              <p className="product-modal__price">
                ${price}
                <span className="product-modal__per">
                  /{category == "hotel" ? "night" : "person"}
                </span>
              </p>
              <Button
                icon="pi pi-shopping-bag"
                label="Book"
                onClick={() => setIsBookingOpen(true)}
              />
            </footer>
          </div>
        </div>
      ) : (
        <>
          <ProductBooking price={price} />
          <Button
            icon="pi pi-arrow-left"
            label="Back"
            onClick={() => setIsBookingOpen(false)}
          />
        </>
      )}
    </Dialog>
  );
}

export default ProductModal;
