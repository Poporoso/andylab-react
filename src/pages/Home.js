import React, { useState, useEffect, } from 'react'
import { useSelector } from 'react-redux';
import { Container, Row, Col } from "reactstrap";

import API from '../store/apiData'

import Loading from '../components/Loading';
import CarouselBlock from '../components/CarouselBlock';
import BookingForm from '../components/booking/BookingForm';
import BlockBlog from '../components/BlockBlog';
import Footer from '../components/Footer';
import About from '../components/About';
import Servizi from '../components/Servizi';
import GalleryBlock from '../components/GalleryBlock';

const Home = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [dataHome, setDataHome] = useState([])

    // Recupero la lingua
    const lang = useSelector(store => store.infoSlice.lang)

    const dataSlider = dataHome.resource?.slider.data
    const dataBlog = dataHome.resource?.news.data['last-post']
    const dataAbout = dataHome.resource?.in_evidenza.data
    const dataServizi = dataHome.resource?.servizi
    const dataGallery = dataHome.resource?.gallery.data

    useEffect(() => {
        API.get(`${lang}/`).then(response => {
            setDataHome(response.data)
        })
    }, [lang])

    useEffect(() => {
        if (dataHome.status) {
            setIsLoading(false)
        }
    }, [dataHome])

    return (
        <>
            <Loading status={isLoading} />
            {dataSlider && <CarouselBlock slider={dataSlider} />}
            <BookingForm />
            {dataAbout && <About data={dataAbout} />}
            {dataServizi && <Servizi data={dataServizi} />}
            <Container>
                {dataGallery && <GalleryBlock data={dataGallery} />}
                <Row>
                    <Col>
                        {dataBlog && <BlockBlog data={dataBlog} />}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Home