import { createContext, useContext, useState } from "react";
import { Product } from "./types";

interface ModalContextType {
  isModalOpen: boolean;
  openModal: (data: Product) => void;
  closeModal: () => void;
  data: Product;
}

/**
 * This context stores the state of the modal and the data that is passed
 * to the modal. The data is an object that contains the information that
 * the modal needs to render itself.
 */
const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * This is a hook that can be used to get the state of the modal and the
 * data that is passed to the modal. It throws an error if the context is
 * not available.
 */
export const ModalConsumer = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("ModalConsumer must be used within a ModalProvider");
  }
  return context;
};

/**
 * This is the provider for the ModalContext. It stores the state of the
 * modal and the data that is passed to the modal in its state.
 */
function ModalProvider({ children }: { children: React.ReactNode }) {
  /**
   * This state variable stores whether the modal is open or not.
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * This state variable stores the data that is passed to the modal.
   */
  const [data, setData] = useState<Product>({
    name: "",
    image: "",
    price: 0,
    description: "",
    category: "",
    rating: 0,
    country: "",
    country_code: "",
    city: "",
    amenity_type: [""],
  });

  /**
   * This function is used to open the modal and pass data to it.
   */
  const openModal = (data: Product) => {
    /**
     * This function sets the state of the data variable to the data that
     * was passed to the openModal function.
     */
    setData(data);
    /**
     * This function sets the state of the isModalOpen variable to true.
     */
    setIsModalOpen(true);
  };

  /**
   * This function is used to close the modal.
   */
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider
      /**
       * This is the value that is passed to the context. It includes the
       * state of the modal and the data that is passed to the modal.
       */
      value={{ isModalOpen, openModal, closeModal, data }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
