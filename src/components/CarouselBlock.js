import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"

// install Swiper modules
SwiperCore.use([Pagination, Navigation]) 

const CarouselBlock = ({slider}) => {

    return (
        <Swiper slidesPerView={1} spaceBetween={0} navigation={{"clickable": true}} pagination={{"dynamicBullets": true, "clickable": true}}>
            {
                Object.entries(slider).map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <img style={{width:'100%'}} src={`${process.env.REACT_APP_URL_UPLOAD}/${item[1].url_immagine}`} alt="Img1" />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default CarouselBlock