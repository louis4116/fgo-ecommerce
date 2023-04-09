import React, { useState } from "react";
import { Navigation, Pagination, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import classes from "./fgoimg.module.css";

const FgoImg = ({ img2, img3 }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState();

  return (
    <div className={classes.fgoImg}>
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        loop
        pagination={{ clickable: true }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className={classes["fgoImg-container"]}
      >
        <SwiperSlide>
          <img
            src={img2}
            className={classes["fgoImg-swiper-slide"]}
            alt="first"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img3}
            className={classes["fgoImg-swiper-slide"]}
            alt="second"
          />
        </SwiperSlide>
      </Swiper>
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={2}
        className={classes["fgoImg-container-second"]}
      >
        <SwiperSlide>
          <img
            src={img2}
            className={classes["fgoImg-swiper-slide-thumbs"]}
            alt="third"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img3}
            className={classes["fgoImg-swiper-slide-thumbs"]}
            alt="fourth"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FgoImg;
