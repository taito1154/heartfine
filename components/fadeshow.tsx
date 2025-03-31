"use client";

import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";

const fadeImages = [
  {
    src: "/photos/Heart1.jpg",
    alt: "Photo1",
  },
  {
    src: "/photos/Heart2.jpg",
    alt: "Photo2",
  },
  {
    src: "/photos/Heart3.jpg",
    alt: "Photo3",
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Fade
        duration={2000}
        transitionDuration={500}
        arrows={false}
        indicators={false}
        // このpauseOnHoverに苦しめられた
        pauseOnHover={false}
      >
        {fadeImages.map((image, index) => (
          // 画像いじりたい時はこのdivで
          <div key={index} className="relative w-screen h-screen">
            <Image src={image.src} alt={image.alt} fill className="logo" />
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;
