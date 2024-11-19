import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import "./DesktopHeader.css";
import { Link, useLocation } from "react-router-dom";

function toggleNavStyle(currentElement: HTMLElement) {
  const navLinksElements: NodeListOf<HTMLElement> = document.querySelectorAll(".list__item");

  navLinksElements.forEach((element) => {
    element.classList.remove("list__item--active");
  });

  currentElement.classList.add("list__item--active");
}

interface NavElement {
  name: string;
  path: string;
  action: (element: HTMLElement) => void;
}

function DesktopHeader() {

  const location = useLocation();
  
  const navElements: NavElement[] = [
    {
      name: "Home",
      path: "/",
      action: toggleNavStyle
    },
    {
      name: "Products",
      path: "/products",
      action: toggleNavStyle
    },
    {
      name: "Contact",
      path: "/contact",
      action: toggleNavStyle
    }
  ]

  return (
    <header className={`desktop-header ${location.pathname === "/" ? "desktop-header--home" : "desktop-header--other"}`}>
      <div className="desktop-header__logo">
        <FontAwesomeIcon className="logo__icon" icon={faSuitcase} />
        <span className="logo__text">Tour Demo</span>
      </div>
      <nav className="desktop-header__nav">
        <ul className="list">
          {navElements.map((element, index: number) => (
            <li key={index} className={'list__item' + ' ' + (index === 0 ? 'list__item--active' : '')} onClick={(e) => element.action(e.currentTarget)}>
              <Link to={element.path}>{element.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default DesktopHeader;
