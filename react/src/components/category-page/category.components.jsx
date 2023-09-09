import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState ,useRef} from "react";
import Footer from "../Footer-page/footer";


const MainPage = () => {

  const cakeRef = useRef(null);

  const [visibleCategories, setVisibleCategories] = useState(6);

  const handleShowMore = () => {
    setVisibleCategories((prevVisible) => prevVisible + 3);
  };

  const cakes = [
    {
      id: 1,
      title: "Carrot",
      imageUrl:
        "https://images.unsplash.com/photo-1592773790059-bb09b7b00b56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2320&q=80",
    },
    {
      id: 1,
      title: "Chocolate",
      imageUrl:
        "https://storetodoorau.com/cdn/shop/products/AssortedCakeSliceWDSA.jpg?v=1658487584",
    },
    {
      id: 4,
      title: "Carrot",
      imageUrl:
        "https://www.thespruceeats.com/thmb/gudThIOveInC9HPv-UfvsJM4pOs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/viennetta-5525482-hero-03-ea7ee46b75f44ec9bc79b0ce7ec7ed06.jpg",
    },
    {
      id: 5,
      title: "Carrot",
      imageUrl:
        "https://eataly.co.uk/wp-content/uploads/2022/03/MAXI_VICENZOVO_Tiramisu.png-scaled.jpg",
    },
    {
      id: 2,
      title: "Angel Cake",
      imageUrl:
        "https://makeitdairyfree.com/wp-content/uploads/2019/03/dairy-free-chocolate-cupcakes-vegan.jpg",
    },
  ];
  const categories = [
    {
      id: 1,
      title: "MYSTERY SLICE",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1670426502280-8985122ab689?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNha2VzfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
    },
    {
      id: 2,
      title: "Bundt Cake ",
      imageUrl:
        "https://images.unsplash.com/photo-1521398359471-8997fbaa9406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
      id: 3,
      title: "Black Forest Cake",
      imageUrl:
        "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmxhY2slMjBGb3Jlc3QlMjBDYWtlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
    },
    {
      id: 4,
      title: "Carrot Cakes",
      imageUrl:
        "https://images.unsplash.com/photo-1501437638401-4addcfd56d3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2Fycm90JTIwQ2FrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
    },
    {
      id: 5,
      title: "Charlotte Cake",
      imageUrl:
        "https://teakandthyme.com/wp-content/uploads/2023/07/strawberry-charlotte-cake-DSC_4861-1x1-1200.jpg",
    },
    {
      id: 6,
      title: "Cheese Cake",
      imageUrl:
        "https://drivemehungry.com/wp-content/uploads/2022/07/strawberry-cheesecake-11.jpg",
    },
    {
      id: 7,
      title: "Chocolate Cake",
      imageUrl:
        "https://cdn.pickuplimes.com/cache/e8/d2/e8d2767ce7ba58f8bf0ffb62b17415c8.jpg",
    },
    {
      id: 8,
      title: "Choco Lava Cake",
      imageUrl:
        "https://life-in-the-lofthouse.com/wp-content/uploads/2022/01/Easy-Molten-Chocolate-Lava-Cakes4.jpg",
    },
    {
      id: 9,
      title: "Coconut Cake",
      imageUrl:
        "https://www.homemadeinterest.com/wp-content/uploads/2019/04/Coconut-Cake-Reshoot_IG-1.jpg",
    },
    {
      id: 10,
      title: "Fruit Cake",
      imageUrl:
        "https://www.bakinglikeachef.com/wp-content/uploads/fresh-fruit-cake.jpg",
    },
    {
      id: 11,
      title: "Genoa Cake",
      imageUrl:
        "https://www.veganfoodandliving.com/wp-content/uploads/2022/09/vegan-genoa-cake.jpg",
    },
    {
      id: 12,
      title: "Geode Cake",
      imageUrl:
        "https://i0.wp.com/basilandbuttercream.com/wp-content/uploads/2021/01/20201120_152933-01.jpeg?resize=750%2C808&ssl=1",
    },
    {
      id: 13,
      title: "Icecream Cake",
      imageUrl:
        "https://sugargeekshow.com/wp-content/uploads/2021/03/oreo_icecream_cake_recipe_featured.jpg",
    },
    {
      id: 14,
      title: "Lemon Cake",
      imageUrl:
        "https://www.onceuponachef.com/images/2019/04/Lemon-Pound-Cake-10-scaled.jpg",
    },
    {
      id: 15,
      title: "Moose Cake",
      imageUrl:
        "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FEdit%2F2022-12-Mousse-Cake%2Fmousse-cake-2",
    },
    {
      id: 16,
      title: "Pound Cake",
      imageUrl:
        "data:image/jpeg;base64,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",
    },
    {
      id: 17,
      title: "Red Velvet Cake",
      imageUrl:
        "https://www.recipetineats.com/wp-content/uploads/2016/06/Red-Velvet-Layer-Cake_4.jpg",
    },
    {
      id: 18,
      title: "Swiss Roll Cake",
      imageUrl:
        "data:image/jpeg;base64,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",
    },
    {
      id: 19,
      title: "Shortcake Cake",
      imageUrl:
        "https://stordfkenticomedia.blob.core.windows.net/df-us/rms/media/recipemediafiles/recipes/retail/x17/2017_strawberry-shortcake_600x600.jpg?ext=.jpg",
    },
    {
      id: 20,
      title: "Chocolate Soufflé",
      imageUrl:
        "https://www.littlesweetbaker.com/wp-content/uploads/2018/09/chocolate-souffle-2-1.jpg",
    },
    {
      id: 21,
      title: "Spice Cake",
      imageUrl:
        "https://ohsweetbasil.com/wp-content/uploads/layered-spice-cake-with-cream-cheese-frosting-recipe-fall-cake-winter-dessert-16.jpg",
    },
    {
      id: 22,
      title: "Sponge Cake",
      imageUrl:
        "https://drivemehungry.com/wp-content/uploads/2022/04/sponge-cake-16.jpg",
    },
    {
      id: 23,
      title: "Tea Cake",
      imageUrl:
        "https://www.imperialsugar.com/sites/default/files/recipe/teacakes-imperial.jpg",
    },
    {
      id: 24,
      title: "Tiramisu",
      imageUrl:
        "https://bakeplaysmile.com/wp-content/uploads/2022/06/tiramisu-square.jpg",
    },
    {
      id: 25,
      title: "Tres Leches Cake",
      imageUrl:
        "https://www.lemonblossoms.com/wp-content/uploads/2023/03/Tres-Leches-Cake-S2.jpg",
    },
    {
      id: 26,
      title: "Upside down Cake",
      imageUrl:
        "https://www.abakingjourney.com/wp-content/uploads/2021/06/Strawberry-Upside-Down-Cake-Feature.jpg",
    },
    {
      id: 27,
      title: "Vanilla Cake",
      imageUrl:
        "https://www.iheartnaptime.net/wp-content/uploads/2022/05/I-Heart-Naptime-homemade-vanilla-cake-500x500.jpg",
    },
  ];

  const carouselImages = cakes.map((category) => ({
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
          {categories
            .slice(0, visibleCategories)
            .map(({ title, id, imageUrl }) => (
              <div key={id} className="category-container">
                <div
                  className="background-image"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                  }}
                />
                <div className="category-body-container">
                  <h2>{title}</h2>
                  <p>Shop Now</p>
                </div>
              </div>
            ))}
        </div>
        {visibleCategories < categories.length && (
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
