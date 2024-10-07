import React from "react";
import "../styles/About.css"; // Import custom CSS for additional styling
import logo from "../images/CINEMATE-LOGO.png";
import ownerPhoto from "../images/wajih.webp"; // Add the path to the owner's photo

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <div className="about-us-text">
          <h3 className="about-us-title">ABOUT US</h3>
          <p>
            Welcome to <b>Cinemate Productions</b>, where passion meets
            expertise to create unforgettable visual experiences. Founded by
            Wajih, a 31-year-old visionary with a background in software
            engineering, our company is dedicated to pushing the boundaries of
            creativity in commercial video production, real estate video
            production, content creation, and photography.
          </p>
          <div className="about-us-owner">
            <img
              src={ownerPhoto}
              alt="Wajih"
              className="about-us-owner-photo"
            />
            <p className="about-us-owner-text">
              Wajih's journey into the world of filmmaking and photography began
              14 years ago when he discovered his passion while shooting parkour
              videos and sharing them on social media. Inspired by the power of
              storytelling through visuals, he decided to turn his hobby into a
              profession. Armed with his engineering acumen and a deep-seated
              love for the craft, Wajih embarked on a mission to redefine the
              art of visual storytelling.
            </p>
          </div>

          <p>
            At Cinemate Productions, we pride ourselves on our ability to
            capture the essence of every project with precision and flair.
            Whether we're creating captivating commercials for businesses,
            showcasing properties in their best light with our real estate
            videos, collaborating with content creators to bring their visions
            to life, or capturing breathtaking moments through photography, we
            approach each endeavor with passion and dedication.
          </p>
          <img src={logo} alt="Logo" className="about-us-logo" />
          <p>
            With Wajih's leadership and skills, we are committed to delivering
            outstanding results that exceed expectations. From concept
            development and scripting to post-production, we combine innovative
            techniques with cutting-edge technology to produce visually stunning
            content that resonates with audiences far and wide. Join us on this
            journey as we continue to push the boundaries of creativity and
            excellence in the world of video production and photography. Welcome
            to Cinemate Productions, where every frame tells a story.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
