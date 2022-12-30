import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Col, Container, Row } from 'reactstrap';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"

import '../../assets/css/carousel.css'


// install Swiper modules
SwiperCore.use([Pagination, Navigation])

const CarouselBlock = ({ slider }) => {

    return (
        <Swiper className="custom-carousel" slidesPerView={1} spaceBetween={0} navigation={{ "clickable": true }} pagination={{ "dynamicBullets": true, "clickable": true }}>
            {
                Object.entries(slider).map((item, index) => {
                    return (
                        <SwiperSlide key={index} className="custom-carousel__item">
                            <div className='custom-carousel__caption'>
                                <Container>
                                    <Row>
                                        <Col>
                                            <h1 className='title'>fvdfvdfv</h1>
                                            <h4 className='sub-title'>fvdfdffdvdf</h4>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                            <img style={{ width: '100%' }} src={`${process.env.REACT_APP_UPLOADS_URL}/${item[1].url_immagine}`} alt="Img1" />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default CarouselBlock