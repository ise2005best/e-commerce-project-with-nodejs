import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState ,useRef} from "react";
import Footer from "../Footer-page/footer";
import slider from '../../slider-data.json';
import product from '../../products-data.json'
import cart from "../../static/noun-add-to-cart-4218815.svg"
const MainPage = () => {

  
  const cakeRef = useRef(null);

  const [visibleCategories, setVisibleCategories] = useState(8);

  const handleShowMore = () => {
    setVisibleCategories((prevVisible) => prevVisible + 4);
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
              <div key={id} className="category-container">
                <div
                  className="background-image"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                  }}
                />
                <div className="category-body-container">
                  <div>
                  <h2>{title}</h2>
                  <p className="cake-prices">{price} </p>
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
        <Footer/>  
    </div>
  );
};
export default MainPage;
