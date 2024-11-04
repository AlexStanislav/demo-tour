import "./RadioInput.css";
import { RadioInputProps } from "../types";
import StarRating from "./StarRating";

function RadioInput({ name, value, label, checked, onChange }: RadioInputProps) {
  const rating = parseInt(value);
  const customLabel = <StarRating rating={rating} />
  
  return (
    <label className="radio">
      <input
        name={name}
        className="radio__input"
        type="radio"
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <span className="radio__checkmark"></span>
      <div className="radio__text">{name === 'rating' ? customLabel : label}</div>
    </label>
  );
}

export default RadioInput;