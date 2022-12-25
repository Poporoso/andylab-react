import React, { useState, useEffect, } from 'react'
import { useSelector } from 'react-redux';
import { Container, Row, Col } from "reactstrap";

import API from '../store/apiData'

import Loading from '../components/block/Loading';
import CarouselBlock from '../components/carousel/CarouselBlock';
import BookingForm from '../components/booking/BookingForm';
import BlockBlog from '../components/home/BlockBlog';
import About from '../components/about/About';
import Servizi from '../components/home/Servizi';
import GalleryBlock from '../components/home/GalleryBlock';
import Footer from '../components/footer/Footer';

const Home = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [dataHome, setDataHome] = useState([])

    // Recupero la lingua
    const lang = useSelector(store => store.infoSlice.lang)

    const dataSlider = dataHome.resource?.slider.data
    const dataBlog = dataHome.resource?.blog.data['last-post']
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
            <section style={{ backgroundColor: '#F4F6F8' }}>
                <Container>
                    <Row>
                        <Col>
                            <BookingForm />
                        </Col>
                    </Row>
                </Container>
            </section>

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