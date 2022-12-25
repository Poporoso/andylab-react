import React, { useState, useEffect } from 'react'
import API from '../../store/apiData'
import { Col, Container, Row } from 'reactstrap';

import Loading from '../../components/block/Loading';
import BookingForm from '../../components/booking/BookingForm';
import Footer from '../../components/footer/Footer';
import { renderText } from '../../helper/Helper'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useParams } from 'react-router-dom';
import RelatedRooms from '../../components/rooms/RelatedRooms';
import RoomService from '../../components/rooms/RoomService';

const Camere = () => {

    /** Parametri link */
    const params = useParams()
    const lang = params.lang
    const camera = params.camera

    const [dataPage, setDataPage] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)

    /** Slider */
    const roomInfo = dataPage.body
    const sliderRoom = dataPage?.slider
    const icone = dataPage?.dettagli?.icone

    useEffect(() => {
        setIsLoading(true)
        const link = `/${lang}/camere/${camera}/`
        API.get(link).then((response) => {
            setDataPage(response.data.resource)
            setDataCall(response.data.data_call)
        })
    }, [lang, camera])

    useEffect(() => {
        window.scrollTo(0, 0)
        if (dataCall) {
            setIsLoading(false)
        }
    }, [dataCall])

    return (
        dataPage &&
        <>
            <Swiper
                slidesPerView={3}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="room-header-slider"
            >
                {
                    sliderRoom &&
                    sliderRoom.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <img src={`${process.env.REACT_APP_UPLOADS_URL}${item.path}/${item.nome}-large.${item.ext}`} alt={item.alt || item.nome_originale} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <Loading status={isLoading} />
            {
                roomInfo &&
                <Container className='py-5'>
                    <Row>
                        <Col xl={12}>
                            <h1>{roomInfo.titolo}</h1>
                        </Col>
                        <Col lg={9}>
                            <img src={`${process.env.REACT_APP_UPLOADS_URL}${roomInfo.immagine}`} alt={roomInfo.titolo} style={{ width: '100%', marginBottom: '20px' }} />
                            {renderText(roomInfo.testo)}
                        </Col>
                        <Col lg={3}>
                            <div className="icon-column">
                                <RoomService data={icone} />
                            </div>
                            <div className="form-block__vertical">
                                <BookingForm />
                            </div>
                        </Col>
                        <Col lg={12}>
                            <h3>Related Rooms</h3>
                            <RelatedRooms />
                        </Col>
                    </Row>
                </Container>
            }
            <Footer />
        </>
    )
}

export default Camere