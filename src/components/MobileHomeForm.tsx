import "./MobileHomeForm.css";
import { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faCalendarAlt,
  faChevronRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "primereact/button";
import { Product } from "../types";

function MobileHomeForm({ products }: { products: Product[] }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const [guests, setGuests] = useState<number | null>(null);

  const search = () => {
    const filteredProducts = products
      .map((product) => {
        if (product.name.toLowerCase().includes(searchValue.toLowerCase())) {
          return product.name;
        }
        return null; // Return null instead of undefined
      })
      .filter((name) => name !== null); // Remove any null values

    setSearchResults(filteredProducts);
  };

  return (
    <div className="home__mobile-form">
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <FontAwesomeIcon icon={faHotel} />
        </span>
        <AutoComplete
          value={searchValue}
          suggestions={searchResults}
          onChange={(e) => setSearchValue(e.value)}
          completeMethod={search}
          placeholder="City"
        />
      </div>

      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <FontAwesomeIcon icon={faCalendarAlt} />
        </span>
        <Calendar
          showButtonBar
          value={checkIn}
          onChange={(e) => setCheckIn(e.value ?? null)}
          placeholder="Check-in"
        />
        <span className="p-inputgroup-addon">
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
        <Calendar
          showButtonBar
          value={checkOut}
          onChange={(e) => setCheckOut(e.value ?? null)}
          placeholder="Check-out"
        />
      </div>

      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <FontAwesomeIcon icon={faUser} />
        </span>
        <InputNumber
          value={guests}
          onChange={(e) => setGuests(e.value ?? null)}
          placeholder="Guests"
          showButtons
          min={1}
          max={10}
        />
      </div>
      <Button label="Search" icon="pi pi-search" />
    </div>
  );
}

export default MobileHomeForm;
