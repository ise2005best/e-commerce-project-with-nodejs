import React, { useState } from "react";
import PRODUCTS from '../products-data.json'
import './product-detail.styles.scss'
const ProductDetail = () => {
    const url = window.location.href.split('/')
    const urlID = url[4] ;
    const productId = PRODUCTS[urlID].id - 2 ;
    // how to get the product description, note the descriptions are for the little pictures below the images
//       PRODUCTS[productId].pictureDescription1
//     PRODUCTS[productId].pictureDescription2
//    PRODUCTS[productId].pictureDescription3
    return (
        <div className="product-detail-container">

                <img src={PRODUCTS[productId].imageUrl} alt= {`${PRODUCTS[productId].title}`} className="main-image"/>
                <h2 className="product-title">
                    {PRODUCTS[productId].title}
                </h2>
                <h2 className="product-price">
                    {PRODUCTS[productId].price}
                </h2>
                <div className="dropdown-container">
                <form>
                    <label className="quantity-label">
                        Quantity
                    </label>
                    <select name="quantity" className="quantity-dropdown">
                        <option> 1 </option>
                        <option> 2 </option>
                        <option> 3 </option>
                        <option> 4 </option>
                        <option> 4 </option>
                        <option> 5 </option> 
                        <option> 6 </option>
                        <option> 7 </option>

                    </select>
                </form>
                </div>
        </div>
    )
}

export default ProductDetail;