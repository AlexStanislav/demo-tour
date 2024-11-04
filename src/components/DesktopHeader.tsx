import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import "./DesktopHeader.css";
import { Link, useLocation } from "react-router-dom";

function DesktopHeader() {

  const location = useLocation();

  return (
    <header className={`desktop-header ${location.pathname === "/" ? "desktop-header--home" : "desktop-header--other"}`}>
      <div className="desktop-header__logo">
        <FontAwesomeIcon className="logo__icon" icon={faSuitcase} />
        <span className="logo__text">Tour Demo</span>
      </div>
      <nav className="desktop-header__nav">
        <ul className="list">
          <li className="list__item">
            <Link to="/">Home</Link>
          </li>
          <li className="list__item">
            <Link to="/products">Products</Link>
          </li>
          <li className="list__item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default DesktopHeader;
