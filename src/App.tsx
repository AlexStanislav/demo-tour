import "./App.css";
import { PrimeReactProvider } from "primereact/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";

import MobileHeader from "./components/MobileHeader";
import { Route, Routes } from "react-router-dom";
import Home from "./views/HomeView";
import ProductsView from "./views/ProductsView";
import DesktopHeader from "./components/DesktopHeader";

function App() {
  return (
    <PrimeReactProvider>
      
      <MobileHeader />
      <DesktopHeader />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsView />} />
        </Routes>
      </main>
      <footer className="footer">
        <section className="footer__section footer__about">
          <div className="logo">
            <FontAwesomeIcon className="logo__icon" icon={faSuitcase} />
            <span className="logo__text">Tour Demo</span>
          </div>

          <p className="footer__description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos, reprehenderit fugiat? Porro, veritatis aliquid eos
            deserunt tenetur unde laboriosam. Voluptatem maxime at pariatur ad,
            eius sit nemo saepe accusantium. Vero.
          </p>
        </section>

        <section className="footer__section footer__links">
          <h3 className="footer__title">Quick Links</h3>
          <ul className="list">
            <li className="list__item">Home</li>
            <li className="list__item">About</li>
            <li className="list__item">Contact</li>
            <li className="list__item">Blog</li>
            <li className="list__item">Shop</li>
            <li className="list__item">FAQ</li>
          </ul>
        </section>

        <section className="footer__section footer__social">
          <h3 className="footer__title">Social</h3>
          <ul className="list">
            <li className="list__item">
              <i className="pi pi-facebook"></i>
              Facebook
              </li>
            <li className="list__item">
              <i className="pi pi-twitter"></i>
              Twitter
              </li>
            <li className="list__item">
              <i className="pi pi-instagram"></i>
              Instagram
              </li>
          </ul>
        </section>

        <section className="footer__section footer__contact">
          <h3 className="footer__title">Contact</h3>
          <ul className="list">
            <li className="list__item">
              <i className="pi pi-envelope"></i>
              Email
              </li>
            <li className="list__item">
              <i className="pi pi-phone"></i>
              Phone
              </li>
            <li className="list__item">
              <i className="pi pi-map-marker"></i>
              Location
              </li>
          </ul>
        </section>

        <section className="footer__section footer__legal">
          <h3 className="footer__title">Legal</h3>
          <ul className="list">
            <li className="list__item">Terms and Conditions</li>
            <li className="list__item">Privacy Policy</li>
            <li className="list__item">Cookie Policy</li>
          </ul>
        </section>

        <p className="footer__copyright">
          © 2023 Tour Demo. All rights reserved.
        </p>
      </footer>
    </PrimeReactProvider>
  );
}

export default App;
