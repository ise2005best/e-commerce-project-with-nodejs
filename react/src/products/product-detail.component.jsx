import React, { useState ,useEffect} from "react";
import PRODUCTS from "../products-data.json";
import "./product-detail.styles.scss";

const ProductDetail = ({ addItemsToCart }) => {
    const url = window.location.href.split("/");
    const urlID = url[4];
    const productId = PRODUCTS[urlID].id - 2;

    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(PRODUCTS[productId]['tiny-images'][0]);

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    const handleAddToCart = () => {
        //add logic to ad to cart
    };

    const handleImageHover = (newImageUrl) => {
        setMainImage(newImageUrl);
      };

    return (
        <div className="app">
            <div className="detail">
                <div className="big-image">
                    <img
                        src={mainImage}
                        alt={`${PRODUCTS[productId].title}`}
                    />
                    
                    <div className="thumb">
                        {PRODUCTS[productId]["tiny-images"].map((image, index) => (
                            <img key={index} 
                            src={image} 
                            alt={PRODUCTS[productId].title}
                            onMouseEnter={() => handleImageHover(image)} />
                        ))}
                    </div>

                </div>
                <div className="box">
                    <div className="rows">
                        <h2 >{PRODUCTS[productId].title}</h2>
                        <p>{PRODUCTS[productId].price}</p>
                    </div>
                    <form>
                        <label className="quantity-label">Quantity: </label>
                        <select
                            name="quantity"
                            className="quantity-dropdown"
                            value={quantity}
                            onChange={handleQuantityChange}
                        >
                            {[1, 2, 3, 4, 5, 6, 7].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </form>

                    <span className="description">{PRODUCTS[productId].description1} </span>
                    <span className="description">{PRODUCTS[productId].description2} </span>
                    <span className="description">{PRODUCTS[productId].description3} </span>

                    <button className="add-to-cart-button" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
