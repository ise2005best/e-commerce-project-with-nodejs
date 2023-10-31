import React, {useState, useContext, useEffect} from "react";
import PRODUCTS from '../../products-data.json';
import { FilteredProductsContext } from "../../context/filteredProduct.context";

const SearchBar = () =>{
  const {updateFilteredProducts} = useContext(FilteredProductsContext)
    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState('');
    const handleFocus = () => {
        setIsFocused(true);
      };
    
      const handleBlur = () => {
        setIsFocused(false);
      };
    
      const handleSearchChange= (event) => {
        const text = event.target.value.toLowerCase();
        setText(text)
      };
    
    useEffect(()=>{
      const newFilteredProducts = PRODUCTS.filter((cake)=>{
       
        // incase user searches in upper case as well
        return cake.title.toLocaleLowerCase().includes(text);
    })
    updateFilteredProducts(newFilteredProducts)

    },[text])
    
    return(
        <div>
 <div className={`search-container ${isFocused ? "focused" : ""}`}>
              <div className="search-icon"></div>
              <input
                type='search'
                placeholder="search ... "
                className={`search-box ${isFocused ? "focused" : ""}`}
                onChange={handleSearchChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
        </div>
       
    )
}
export default SearchBar;
