import React, { useRef, useContext, useState } from "react";
import { CartContext } from "../../context/cart.context";
import { useNavigate } from 'react-router-dom';
import { FilteredProductsContext } from "../../context/filteredProduct.context";
import product from '../../products-data.json';


const CakesCategory = () => {
    const { addItemsToCart } = useContext(CartContext);
    const {filteredProducts} = useContext(FilteredProductsContext);
    const navigate = useNavigate();
    const cakeRef = useRef(null);
    const [visibleCategories, setVisibleCategories] = useState(8);
    const handleShowMore = () => {
        setVisibleCategories((prevVisible) => prevVisible + 4);
    };
    const addItemToCart = (event) => {
        const buttonId = event.target.id;
        const productId = buttonId;
        if (productId == buttonId) {
            const products = []
            products.id = product[productId - 1].id
            products.title = product[productId - 1].title
            products.imageUrl = product[productId - 1].imageUrl
            products.price = product[productId - 1].price
            addItemsToCart(products)
        }
    };
    const navigateToProductPage = (id) => {
        navigate(`/product/${id}`);
    };
    return (
        <div>
<div ref={cakeRef} className="categories-container">
            {product
                .slice(0, visibleCategories)
                .map(({ title, id, imageUrl, price }) => (
                    <div
                        key={id}
                        className="category-container"
                    >
                        <div
                            onClick={() => navigateToProductPage(id)}
                            className="background-image"
                            style={{
                                backgroundImage: `url(${imageUrl})`,
                            }}
                        />
                        <div className="category-body-container">
                            <div>
                                <div onClick={() => navigateToProductPage(id)}>
                                    <h2>{title}</h2>
                                    <p className="cake-prices">{price}</p>
                                </div>
                                <button onClick={addItemToCart} type='button' id={id} >
                                    Add To Cart
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
        </div>
        {visibleCategories < product.length && (
                <button className="show-more-button" onClick={handleShowMore}>
                    Show More
                </button>
            )}
        </div>
        
    )
}
export default CakesCategory;

