import "./MobileHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faEnvelope,
  faHotel,
  faPlane,
  faSuitcase
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { useNavigate, useLocation } from "react-router-dom";

function MobileHeader() {
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  function navigateTo(path: string) {
    navigate(path);
    setIsActive(false);
  }

  return (
    <header className={`mobile-header ${location.pathname === "/" ? "mobile-header--home" : "mobile-header--other"}`}>
      <nav className="mobile-nav">
        <FontAwesomeIcon
          className="mobile-nav__menu"
          icon={faBars}
          onClick={() => setIsActive(true)}
        />

        <div className="logo">
          <FontAwesomeIcon className="logo__icon" icon={faSuitcase} />
          <span className="logo__text">Tour Demo</span>
        </div>

        <Sidebar visible={isActive} onHide={() => setIsActive(false)}>
          <h2 className="mobile-nav__title">
            <FontAwesomeIcon className="mobile-nav__logo" icon={faPlane} />
            <span>Shop Demo</span>
          </h2>
          <section className="mobile-nav__links">
            <ul className="mobile-nav__list">
              <li className="mobile-nav__item" onClick={() => navigateTo("/")}>
                <FontAwesomeIcon className="mobile-nav__icon" icon={faHome} />
                Home
              </li>

              <li className="mobile-nav__item" onClick={() => navigateTo("/products")}>
                <FontAwesomeIcon className="mobile-nav__icon" icon={faHotel} />
                Products
              </li>

              <li className="mobile-nav__item" onClick={() => navigateTo("/contact")}>
                <FontAwesomeIcon
                  className="mobile-nav__icon"
                  icon={faEnvelope}
                />
                Contact
              </li>
            </ul>
          </section>
        </Sidebar>
      </nav>
    </header>
  );
}

export default MobileHeader;
