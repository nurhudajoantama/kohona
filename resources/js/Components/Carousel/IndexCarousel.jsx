import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function IndexCarousel() {
    return (
        <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
            <div>
                <img src="/assets/images/ads/carousel1.png" />
            </div>
            <div>
                <img src="/assets/images/ads/carousel1.png" />
            </div>
            <div>
                <img src="/assets/images/ads/carousel1.png" />
            </div>
        </Carousel>
    );
}
