import "./DesktopHomeForm.css";
import { Product as ProductType } from "../types";
import { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faCalendarAlt,
  faChevronRight,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

function DesktopHomeForm({ products }: { products: ProductType[] }) {
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
    <div className="desktop-home-form">
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <FontAwesomeIcon icon={faHotel} />
        </span>
        <AutoComplete
          value={searchValue}
          suggestions={searchResults}
          onChange={(e) => setSearchValue(e.value)}
          completeMethod={search}
          placeholder="Search"
        />
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
        <span className="p-inputgroup-addon">
          <FontAwesomeIcon icon={faUser} />
        </span>
        <InputNumber placeholder="Guests" value={guests} onChange={(e) => setGuests(e.value)} showButtons min={1} />
        <Button label="Search" className="desktop-home-form__button" icon="pi pi-search" />
      </div>
    </div>
  );
}

export default DesktopHomeForm;
