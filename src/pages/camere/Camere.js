import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';

import { renderText } from '../../helper/Helper';
import Loading from '../../components/block/Loading';
import RoomCard from '../../components/rooms/RoomCard';
import BookingForm from '../../components/booking/BookingForm';
import HeaderPage from '../../components/header/HeaderPage';
import Footer from '../../components/footer/Footer';
import API from '../../store/apiData'

const Camere = () => {

    const [dataPage, setDataPage] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    /** Parametri link */
    const params = useParams()

    const roomList = dataPage?.room_list
    const titolo = dataPage?.body?.titolo
    const testo = dataPage?.body?.testo
    const html = dataPage?.html

    useEffect(() => {
        setIsLoading(true)
        const link = `/${params.lang}/camere/`
        API.get(link).then((response) => {
            setDataPage(response.data.resource)
            setIsLoading(false)
        })
    }, [params.lang])

    return (
        <>
            <Loading status={isLoading} />
            <HeaderPage options={{
                title: html?.title,
                subTitle: html?.sub_title,
                urlImage: html?.image_preview
            }} />
            <Container className='py-5'>
                <Row>
                    <Col lg={9}>
                        <Row>
                            <Col xl={12}>
                                <h1>{titolo}</h1>
                                <p>{renderText(testo)}</p>
                            </Col>
                            {
                                roomList &&
                                roomList.map((item, index) => {
                                    return (
                                        <RoomCard key={index} data={item} />
                                    )
                                })
                            }
                        </Row>
                    </Col>
                    <Col lg={3} className="form-block__vertical">
                        <BookingForm />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Camere