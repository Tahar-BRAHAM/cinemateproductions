import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Carousel.css";

import slide1 from "../images/slide1.webp";
import slide2 from "../images/slide2.webp";
import slide3 from "../images/slide4.webp";
import slide4 from "../images/slide3.webp";
import slide5 from "../images/slide5.webp";

const images = [
  {
    src: slide1,
    alt: "Image 1 Description",
    title: "CAPTURING MOMENTS, CRAFTING STORIES",
    popupText:
      "Transform your vision into stunning visuals with our expert video production services.",
  },
  {
    src: slide2,
    alt: "Image 2 Description",
    title: "FROM CONCEPT TO SCREEN",
    popupText:
      "We bring your ideas to life with high-quality video production and creative storytelling.",
  },
  {
    src: slide3,
    alt: "Image 3 Description",
    title: "YOUR STORY, PERFECTLY TOLD",
    popupText: "Professional video production to make your brand stand out.",
  },
  {
    src: slide4,
    alt: "Image 4 Description",
    title: "Lights, Camera, Action!",
    popupText:
      "Experience the magic of top-notch video production that captures every detail.",
  },
  {
    src: slide5,
    alt: "Image 5 Description",
    title: "VISUALS THAT INSPIRE",
    popupText:
      "Creating compelling videos that connect and engage your audience.",
  },
];

const CarouselComponent = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [autoShowIndex, setAutoShowIndex] = useState(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      const timer = setTimeout(() => {
        setAutoShowIndex(hoveredIndex);
      }, 1000); // Delay of 3 seconds before showing the overlay
      return () => clearTimeout(timer);
    }
  }, [hoveredIndex]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setAutoShowIndex(null); // Reset auto-show when manually hovered
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setAutoShowIndex(null);
  };

  const handleMouseMove = (e, index) => {
    if (hoveredIndex === index) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }
  };

  return (
    <div>
      <Swiper
        spaceBetween={0}
        slidesPerView={3}
        direction="horizontal"
        pagination={{ clickable: true }}
        loop={false}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1080: {
            slidesPerView: 3,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className={`tile ${
                hoveredIndex === index || autoShowIndex === index
                  ? "hovered"
                  : ""
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onClick={() =>
                setAutoShowIndex(autoShowIndex === index ? null : index)
              } // Toggle on touch/click
            >
              <div
                className="tile-background"
                style={{
                  backgroundImage: `url(${image.src})`,
                  transform:
                    hoveredIndex === index
                      ? `scale(1.1) translate(${
                          (mousePos.x / window.innerWidth) * 10
                        }px, ${(mousePos.y / window.innerHeight) * 10}px)`
                      : "scale(1)",
                }}
              ></div>
              <img
                src={image.src}
                alt={image.alt}
                className="tile-image"
                loading="lazy"
              />
              <div
                className={`hover-overlay ${
                  hoveredIndex === index || autoShowIndex === index
                    ? "visible"
                    : ""
                }`}
              >
                <div className="hover-content">
                  <h3 className="hover-title">{image.title}</h3>
                  <div className="hover-text">
                    <p>{image.popupText}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselComponent;
