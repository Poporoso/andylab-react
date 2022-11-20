import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "reactstrap";

import API from '../store/apiData'

import Loading from '../components/Loading';
import CarouselBlock from '../components/CarouselBlock';
import BookingForm from '../components/BookingForm';
import BlockBlog from '../components/BlockBlog';
import Footer from '../components/Footer';
import About from '../components/About';
import Servizi from '../components/Servizi';
import GalleryBlock from '../components/GalleryBlock';

const Home = ({lang}) => {

    const [ dataHome, setDataHome ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)

	const dataSlider = dataHome.resource?.slider.data
	const dataBlog = dataHome.resource?.news.data['last-post']
	const dataAbout = dataHome.resource?.in_evidenza.data
	const dataServizi = dataHome.resource?.servizi
	const dataGallery = dataHome.resource?.gallery.data

    useEffect(() => {
        API.get(`${lang}/`).then(response => {
            setDataHome(response.data)
            setIsLoading(false)
        })
    }, [lang])

    return (
        <React.Fragment>
            <Loading status={isLoading} />
            { dataSlider && <CarouselBlock slider={dataSlider} />}
            <BookingForm lang={lang} />
           { dataAbout && <About data={dataAbout} /> }
           { dataServizi && <Servizi data={dataServizi} /> }
            <Container>
           { dataGallery && <GalleryBlock data={dataGallery} /> }
                <Row>
                    <Col>
                        { dataBlog && <BlockBlog data={dataBlog} /> }
                    </Col>
                </Row>
            </Container>
            <Footer />
        </React.Fragment>
    )
}

export default Home