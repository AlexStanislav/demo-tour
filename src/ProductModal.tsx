import { Dialog } from "primereact/dialog";
import { Product } from "./types";
import "./ProductModal.css";
import StarRating from "./components/StarRating";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
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
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputMask } from "primereact/inputmask";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { useLocation } from "react-router-dom";

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
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number | null>(null);

  const calculateTotal = (checkIn: Date, checkOut: Date, guests: number) => {
    if (checkIn && checkOut && guests) {
      const days = Math.round(
        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
      );
      return days * guests * price;
    }
    return 0;
  };

  const checkInState = useLocation().state as { checkIn: Date | null };
  const checkOutState = useLocation().state as { checkOut: Date | null };
  const guestsState = useLocation().state as { guests: number | null };

  useEffect(() => {
    if (checkInState) {
      setCheckIn(checkInState.checkIn);
    }
    if (checkOutState) {
      setCheckOut(checkOutState.checkOut);
    }
    if (guestsState) {
      setGuests(guestsState.guests);
    }
  }, [checkInState, checkOutState, guestsState]);

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
        <div className="product-modal__booking">
          <form className="form">
            <span className="p-inputgroup form__row">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText placeholder="First Name" />
              <span className="p-inputgroup-addon"></span>
              <InputText placeholder="Last Name" />
            </span>

            <span className="p-inputgroup form__row">
              <span className="p-inputgroup-addon">
                <i className="pi pi-phone"></i>
              </span>
              <InputMask mask="(999) 999-9999" placeholder="Phone Number" />
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope"></i>
              </span>
              <InputText placeholder="Email" />
            </span>

            <span className="p-inputgroup form__row">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar"></i>
              </span>
              <Calendar
                showButtonBar
                value={checkIn}
                onChange={(e) => setCheckIn(e.value ?? null)}
                placeholder="Check-in"
              />
              <span className="p-inputgroup-addon">
                <i className="pi pi-chevron-right"></i>
              </span>
              <Calendar
                showButtonBar
                value={checkOut}
                onChange={(e) => setCheckOut(e.value ?? null)}
                placeholder="Check-out"
              />
            </span>

            <span className="p-inputgroup form__row">
              <span className="p-inputgroup-addon">
                <i className="pi pi-users"></i>
              </span>
              <InputNumber
                placeholder="Guests"
                value={guests}
                onChange={(e) => setGuests(e.value)}
                showButtons
                min={1}
                max={10}
              />
            </span>

            <InputTextarea
              className="form__textarea"
              placeholder="Additional Information"
            />

            <div className="form__summary">
              <h3>Summary</h3>
              <p className="form__summary-item">
                <i className="pi pi-calendar"></i>Check In:{" "}
                {checkIn?.toLocaleDateString()}
              </p>
              <p className="form__summary-item">
                <i className="pi pi-calendar"></i>Check Out:{" "}
                {checkOut?.toLocaleDateString()}
              </p>
              <p className="form__summary-item">
                <i className="pi pi-users"></i>Guests: {guests}
              </p>
            </div>
            <p className="form__total">
              <span className="form__total-label">Total</span>$
              {checkIn && checkOut && guests
                ? calculateTotal(checkIn, checkOut, guests)
                : 0}
            </p>

            <Button
              label="Book Now"
              icon="pi pi-check"
              className="form__button"
            />
          </form>
          <Button
            icon="pi pi-arrow-left"
            label="Back"
            onClick={() => setIsBookingOpen(false)}
          />
        </div>
      )}
    </Dialog>
  );
}

export default ProductModal;
