import React, { useState, useContext} from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/cart.context";
import Slider from "react-slick"; // Import the Slider component
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme CSS
import PRODUCTS from '../products-data.json';
import './product-detail.styles.scss';


const ProductDetail = () => {
     const {addItemWithQuantityToCart} = useContext(CartContext)
     const [quantity, setQuantity] = useState(1);
     const {id} = useParams();
    // const url = window.location.href.split('/');
    // const urlID = url[4];
    // // console.log(url, urlID);
    // if(!urlID){
    //     return null;
    // }
    const productId = PRODUCTS[id]?.id - 2;

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    const handleAddToCart = () => {
        addItemWithQuantityToCart(PRODUCTS[id - 1], quantity)
        //add logic to ad to cart
    };
    return (
        <div className="product-detail-container">
            <div className="product-main">
                <div className="product-image-container">
                    <img src={PRODUCTS[productId].imageUrl} alt={`${PRODUCTS[productId].title}`} className="main-image" />
                </div>
                <div className="product-info">
                    <h2 className="product-title">{PRODUCTS[productId].title}</h2>
                    <h2 className="product-price">{PRODUCTS[productId].price}</h2>
                    <div className="dropdown-container">
                        <form>
                            <label className="quantity-label">Quantity</label>
                            <select name="quantity" className="quantity-dropdown" value={quantity} onChange={handleQuantityChange}>
                                {[1, 2, 3, 4, 5, 6, 7].map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </form>
                    </div>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="product-details">
                <h3>Product Descriptions</h3>
                <p className="description">{PRODUCTS[productId].description1}</p>
                <p className="description">{PRODUCTS[productId].description2}</p>
                <p className="description">{PRODUCTS[productId].description3}</p>
            </div>
        </div>
  );
};

export default ProductDetail;
