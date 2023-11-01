import React, {useContext} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../Footer-page/footer";
import slider from '../../slider-data.json';
import { FilteredProductsContext } from "../../context/filteredProduct.context";
import CakesCategory from "./cakes-category.components";

const MainPage = () => {
  const {filteredProducts} = useContext(FilteredProductsContext);
  const lengthOfFilteredProducts = filteredProducts.length >= 27;
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
   {
    lengthOfFilteredProducts
    ? 
    <div className="carousel-container"> 
 <Slider {...carouselSettings} className="carousel">
    {carouselImages.map((image) => (
      <div key={image.id}>
        <img src={image.imageUrl} alt={`Carousel ${image.id}`} />
      </div>
    ))}
  </Slider>
  <CakesCategory />
  <Footer />
      </div>
   
  :
  <div className="carousel-container">  
  <CakesCategory/>
  <Footer/>
 </div>
 
   }     
    </div>
  );
};

export default MainPage;
