import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef } from "react";
import { CartContext } from "../../context/cart.context";
import Footer from "../Footer-page/footer";
import slider from '../../slider-data.json';
import product from '../../products-data.json';
import cart from "../../static/noun-add-to-cart-4218815.svg";
import { useNavigate } from 'react-router-dom';
const MainPage = () => {
  const { addItemsToCart} = useContext(CartContext);
  const cakeRef = useRef(null);
  const navigate = useNavigate();

  const [visibleCategories, setVisibleCategories] = useState(8);

  const handleShowMore = () => {
    setVisibleCategories((prevVisible) => prevVisible + 4);
  };

  const addItemToCart = (event) => {
    const buttonId = event.target.id;
    const productId = buttonId;
    if(productId == buttonId){
      const products = []
      products.id = product[productId - 1].id
      products.title = product[productId - 1].title
      products.imageUrl = product[productId - 1].imageUrl
      products.price = product[productId -1].price
      addItemsToCart(products)
    }
  };

  const navigateToProductPage = (id) => {
    navigate(`/product/${id}`);
  };

  const carouselImages = slider.map((category) => ({
    id: category.id,
    imageUrl: category.imageUrl,
  }));

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Auto-animate the slider
    autoplaySpeed: 3000, // Set the time between slides (in milliseconds)
  };

  return (
    <div>
      <div>
        <div className="carousel-container">
          <Slider {...carouselSettings} className="carousel">
            {carouselImages.map((image) => (
              <div key={image.id}>
                <img src={image.imageUrl} alt={`Carousel ${image.id}`} />
              </div>
            ))}
          </Slider>
        </div>

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

                  <img className="cart" src={cart} alt="add to cart"/> 
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
      <Footer />  
    </div>
  );
};

export default MainPage;
