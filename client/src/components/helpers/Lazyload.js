import React from "react";
import { LazyLoadImage, trackWindowScroll, scrollPosition } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MyImage = ({ src, alt }) => (

    <LazyLoadImage alt={alt} scrollPosition={scrollPosition} effect="blur" src={src} />
  
);
export default trackWindowScroll(MyImage);
