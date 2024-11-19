import "./ContactView.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

function ContactView() {
  return (
    <section className="contact">
      <section className="contact__left">
        <h2 className="contact__title">Contact</h2>

        <ul className="contact__list">
          <li className="contact__item">
            <h3><i className="pi pi-map-marker"></i>Address</h3>
            <p>123 Main St, Anytown, USA</p>
          </li>
          <li className="contact__item">
            <h3><i className="pi pi-phone"></i>Phone</h3>
            <p>(123) 456-7890</p>
          </li>
          <li className="contact__item">
            <h3><i className="pi pi-envelope"></i>Email</h3>
            <p>demotour@example.com</p>
          </li>
        </ul>

        <p className="contact__description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos,
          reprehenderit fugiat? Porro, veritatis aliquid eos deserunt tenetur
          unde laboriosam. Voluptatem maxime at pariatur ad, eius sit nemo saepe
          accusantium. Vero.
        </p>

        <form className="contact__form">
          <InputText placeholder="Name" />
          <InputText placeholder="Email" />
          <InputTextarea placeholder="Message" />

          <Button icon="pi pi-send" label="Send" />
        </form>
      </section>
      <section className="contact__right">
        <img src="https://picsum.photos/800/600?random=1" alt="" />
      </section>
    </section>
  );
}

export default ContactView;
