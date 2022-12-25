import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import API from '../../store/apiData'
import { renderText } from '../../helper/Helper'

const RelatedRooms = () => {

    const [dataPage, setDataPage] = useState({})

    /** Parametri link */
    const params = useParams()

    const roomList = dataPage.room_list

    useEffect(() => {
        const link = `/${params.lang}/camere/`
        API.get(link).then((response) => {
            setDataPage(response.data.resource)
        })
    }, [params.lang])

    return (
        <Row>
            {
                roomList &&
                roomList.map((item, index) => {
                    const prezzo = item.dettagli?.a_partire_da
                    return (
                        <Col lg={4} key={index}>
                            <div className="room-related-block">
                                <div className="room-related-image">
                                    <img src={`${process.env.REACT_APP_UPLOADS_URL}${item.immagine}`} alt={item.titolo} />
                                </div>
                                <div className="room-related-content">
                                    {
                                        prezzo &&
                                        <p className="room-related-meta-info">
                                            A partire da
                                            <span className="theme-color" style={{ marginLeft: '4px' }}>
                                                &euro; {prezzo}
                                            </span>
                                            /notte
                                        </p>
                                    }
                                    <h4 className="room-related-title mb_20">
                                        <Link to="/">
                                            {item.titolo}
                                        </Link>
                                    </h4>
                                    <p className="room-related-text mb_30">
                                        <p>{renderText(item.testo.substr(0, 80) + ' [...]')}</p>
                                    </p>
                                    <div className="link-btn">
                                        <Link className='btn btn-primary' to={`/${params.lang}/camere/${item.permalink}/`}>
                                            View Details
                                            <i style={{ marginLeft: '8px' }} className="ion-android-arrow-forward"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default RelatedRooms