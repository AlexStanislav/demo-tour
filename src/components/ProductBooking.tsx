import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputMask } from "primereact/inputmask";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "primereact/button";

function ProductBooking({ price }: { price: number }) {
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

        <Button label="Book Now" icon="pi pi-check" className="form__button" onClick={(e) => {e.preventDefault();}} />
      </form>
      
    </div>
  );
}

export default ProductBooking;
