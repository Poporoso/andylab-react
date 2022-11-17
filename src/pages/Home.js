import React, { useState } from 'react'
import API from '../store/apiData'

import { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Loading from '../components/Loading';
import CarouselBlock from '../components/CarouselBlock';
import BookingForm from '../components/BookingForm';
import BlockBlog from '../components/BlockBlog';

const Home = ({lang}) => {

    const [ dataHome, setDataHome ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)

	const dataSlider = dataHome.resource?.slider.data
	const dataBlog = dataHome.resource?.news.data['last-post']

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
            <BookingForm />
            <Container>
                <Row>
                    <Col>
                        { dataBlog && <BlockBlog data={dataBlog} /> }
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Home