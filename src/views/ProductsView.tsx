import "./ProductsView.css";
import { Accordion, AccordionTab } from "primereact/accordion";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import { Product as ProductType } from "../types";
import ProductCard from "../components/ProductCard";
import { Paginator } from "primereact/paginator";
import RadioInput from "../components/RadioInput";
import { Slider } from "primereact/slider";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import ProductCardList from "../components/ProductCardList";

function getCountries(
  products: ProductType[]
): { name: string; code: string }[] {
  const countries = products.map((product) => {
    return {
      name: product.country,
      code: product.country_code,
    };
  });

  // Filter the countries array to get unique countries based on their codes
  const uniqueCountries = countries.filter(
    (country, index) =>
      // Find the first occurrence of a country with the same code
      countries.findIndex((c) => c.code === country.code) === index
  );

  return uniqueCountries;
}

function ProductsView() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<ProductType[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const [first, setFirst] = useState(0);
  const rows = 8;

  const [filterCountry, setFilterCountry] = useState<string>("All");
  const [filterRating, setFilterRating] = useState<string>("All");
  const [filterPrice, setFilterPrice] = useState<number[]>([0, 10000]);

  const [productDisplayType, setProductDisplayType] = useState("grid");

  const productCountries = getCountries(products);

  const changePage = (event: { page: number }) => {
    setFirst(event.page * rows);
    const last = event.page * rows;
    setDisplayedProducts(products.slice(first, last));
  };

  useEffect(() => {
    const last = first + rows;
    setDisplayedProducts(products.slice(first, last));
    setTotalProducts(products.length);
  }, [products, first]);

  useEffect(() => {
    fetch("/MOCK_DATA.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

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
    searchProducts();
  };

  const searchProducts = () => {
    const filteredProducts = products.filter((product) =>
      searchResults.includes(product.name)
    );
    console.log(filteredProducts);
    setDisplayedProducts(filteredProducts);
  };

  const resetSearch = () => {
    setSearchValue("");
    setDisplayedProducts(products.slice(first, rows));
    setFilterCountry("All");
    setFilterRating("All");
    setFilterPrice([0, 10000]);
    setTotalProducts(products.length);
  };

  const filterProducts = () => {
    const filteredProducts = products.filter(
      (product) =>
        (filterCountry === "All" || product.country_code === filterCountry) &&
        (filterRating === "All" || product.rating >= parseInt(filterRating)) &&
        filterPrice[0] <= product.price &&
        product.price <= filterPrice[1]
    );

    console.log(filteredProducts);
    setTotalProducts(filteredProducts.length);
    setDisplayedProducts(filteredProducts.slice(first, rows));
  };

  return (
    <section className="products">
      <nav className="products__filters">
        <h2 className="title products__filters-title">Filters</h2>
        <div className="products__search p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-search" />
          </span>
          <AutoComplete
            value={searchValue}
            suggestions={searchResults}
            onChange={(e) => setSearchValue(e.value)}
            completeMethod={search}
            onClear={resetSearch}
          ></AutoComplete>
        </div>
        <Accordion
          className="products__accordion"
          multiple
          activeIndex={[0, 1, 2]}
        >
          <AccordionTab header="Country">
            <ul className="list">
              <li className="list__item">
                <RadioInput
                  name="country_all"
                  value="All"
                  checked={filterCountry === "All"}
                  label="All"
                  onChange={(e) => setFilterCountry(e.target.value)}
                />
              </li>
              {productCountries.map((country) => (
                <li key={country.code} className="list__item">
                  <RadioInput
                    name="country"
                    value={country.code}
                    checked={filterCountry === country.code}
                    label={country.name}
                    onChange={(e) => setFilterCountry(e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </AccordionTab>

          <AccordionTab header="Rating">
            <ul className="list">
              <li className="list__item">
                <RadioInput
                  name="rating_all"
                  value="All"
                  checked={filterRating === "All"}
                  label="All"
                  onChange={(e) => setFilterRating(e.target.value)}
                />
              </li>
              {[5, 4, 3, 2, 1].map((rating) => (
                <li key={rating} className="list__item">
                  <RadioInput
                    name="rating"
                    value={rating.toString()}
                    checked={filterRating === rating.toString()}
                    label={rating.toString()}
                    onChange={(e) => setFilterRating(e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </AccordionTab>

          <AccordionTab header="Price">
            <div className="products__price p-inputgroup">
              <InputNumber value={filterPrice[0]} readOnly />
              <span className="p-inputgroup-addon">
                <i className="pi pi-chevron-right"></i>
              </span>
              <InputNumber value={filterPrice[1]} readOnly />
            </div>
            <Slider
              value={[filterPrice[0], filterPrice[1]]}
              onChange={(e) => setFilterPrice(e.value as number[])}
              min={0}
              max={10000}
              range
            />
          </AccordionTab>
        </Accordion>
        <Button
          className="products__price-button"
          icon="pi pi-filter"
          label="Apply"
          onClick={filterProducts}
        />
        <Button
          className="products__price-button"
          icon="pi pi-filter-slash"
          label="Reset"
          onClick={resetSearch}
        />
      </nav>
      <section className="products__list">
        <header className="products__header">
          <span className="products__list-count">
            Showing {first + 1} to {first + 8} of {products.length}
          </span>
          <span className="products__list-controls">
            <i className="pi pi-list" onClick={() => setProductDisplayType("list")}></i>
            <i className="pi pi-th-large" onClick={() => setProductDisplayType("grid")}></i>
          </span>
        </header>
        <div className="products__wrapper">
          {displayedProducts.map((product) => {
            if (productDisplayType === "grid") {
              return (
                <ProductCard
                  key={`${product.name}${product.price}`}
                  product={product}
                />
              );
            } else if (productDisplayType === "list") {
              return (
                <ProductCardList
                  key={`${product.name}${product.price}`}
                  product={product}
                />
              )
            }
          })}
        </div>
        <Paginator
          first={first}
          rows={rows}
          totalRecords={totalProducts}
          onPageChange={changePage}
          template={{
            layout:
              "CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown",
          }}
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        />
      </section>
    </section>
  );
}

export default ProductsView;
