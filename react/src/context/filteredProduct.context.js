import React, { createContext, useState } from "react";
import PRODUCTS from '../products-data.json';

export const FilteredProductsContext = createContext({
    filteredProducts: [],
    updateFilteredProducts: () => {}
}
);

export const FilteredProductsProvider = ({ children }) => {
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);

  const updateFilteredProducts = (newFilteredProducts) => {
    setFilteredProducts(newFilteredProducts);
  };

  return (
    <FilteredProductsContext.Provider value={{ filteredProducts, updateFilteredProducts }}>
      {children}
    </FilteredProductsContext.Provider>
  );
};
