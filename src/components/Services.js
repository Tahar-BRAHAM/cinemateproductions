import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/Services.css";

// Import images directly
import commercial1 from "../images/commercial1.webp";
import commercial2 from "../images/commercial2.webp";
import commercial3 from "../images/commercial3.webp";
import commercial4 from "../images/commercial4.webp";
import commercial5 from "../images/commercial5.webp";
import commercial6 from "../images/commercial6.webp";

import realEstate1 from "../images/realestate1.webp";
import realEstate2 from "../images/realestate2.webp";
import realEstate3 from "../images/realestate3.webp";

import contentCreation1 from "../images/contentcreation1.webp";
import contentCreation2 from "../images/contentcreation2.webp";
import contentCreation3 from "../images/contentcreation3.webp";

import photography1 from "../images/photography1.webp";
import photography2 from "../images/photography2.webp";
import photography3 from "../images/photography3.webp";

const Services = () => {
  const commercialImages = [
    commercial1,
    commercial2,
    commercial3,
    commercial4,
    commercial5,
    commercial6,
  ];

  const realEstateImages = [realEstate1, realEstate2, realEstate3];

  const contentCreationImages = [
    contentCreation1,
    contentCreation2,
    contentCreation3,
  ];

  const photographyImages = [photography1, photography2, photography3];

  // Function to cache images
  const loadCachedImage = (src) => {
    const cachedImage = localStorage.getItem(src);
    if (cachedImage) {
      return cachedImage;
    } else {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        try {
          localStorage.setItem(src, img.src);
        } catch (e) {
          console.log("LocalStorage limit exceeded, could not cache image.");
        }
      };
      return src; // Return the original src while loading
    }
  };

  const renderCarousel = (images) => (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      className="service-carousel"
      interval={5000} // Adjusted interval time for slower transitions
      transitionTime={1000} // Duration of the transition for smoother effect
    >
      {images.map((image, index) => (
        <div key={index}>
          <img src={loadCachedImage(image)} alt="Service" loading="lazy" />
        </div>
      ))}
    </Carousel>
  );

  return (
    <div className="service-container">
      <div className="service-content">
        <h3 className="service-title">OUR SERVICES</h3>

        <div className="service-sections">
          <div className="service-section">
            {renderCarousel(commercialImages)}
            <h3 className="service-heading">Commercial</h3>
            <p className="service-description">
              Elevate your brand with Cinemate Productions commercial video
              production service. From dynamic company profiles to
              mouth-watering restaurant showcases, captivating coffee shop
              promos to exhilarating car dealership ads, we specialize in
              crafting compelling commercials that drive engagement and leave a
              lasting impression. Let us bring your business to life on screen
              and help you stand out from the competition.
            </p>
          </div>

          <div className="service-section">
            {renderCarousel(realEstateImages)}
            <h3 className="service-heading">Real Estate</h3>
            <p className="service-description">
              Unlock the potential of your property with Cinemate Productions'
              real estate video production service. From luxurious estates to
              cozy condos, we specialize in creating stunning visual narratives
              that highlight the unique features and charm of every listing.
              Elevate your real estate marketing strategy and captivate
              potential buyers with cinematic tours that leave a lasting
              impression.
            </p>
          </div>

          <div className="service-section">
            {renderCarousel(contentCreationImages)}
            <h3 className="service-heading">Content Creation</h3>
            <p className="service-description">
              Ignite your creativity with Cinemate Productions' content creation
              service for content creators. Whether you're a vlogger,
              influencer, or aspiring filmmaker, we're here to bring your vision
              to life. From engaging storytelling to captivating visuals, we
              specialize in crafting dynamic content that resonates with your
              audience and helps you stand out in the digital landscape. Let us
              be your creative partner in bringing your ideas to the screen and
              elevating your online presence.
            </p>
          </div>

          <div className="service-section">
            {renderCarousel(photographyImages)}
            <h3 className="service-heading">Photography</h3>
            <p className="service-description">
              Capture the essence of every moment with Cinemate Productions'
              photography service. From stunning portrait sessions that showcase
              your personality to professional corporate shoots that convey your
              brand's professionalism, we specialize in creating visually
              striking images that leave a lasting impression. Whether you're
              looking to update your headshots or capture important milestones,
              trust us to deliver exceptional results that exceed your
              expectations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
