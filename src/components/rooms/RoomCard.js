import React from 'react'
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { renderText } from '../../helper/Helper'
import RoomService from './RoomService';

import '../../assets/css/font-icon/hotel-icon.css'

const RoomCard = ({ data }) => {

    const { titolo, testo, permalink, immagine, dettagli } = data
    const prezzo = dettagli.a_partire_da?.split(',')
    const icone = dettagli.icone

    return (
        <Row className="room-block g-0">
            <Col lg={5}>
                <span className='room-block__image'>
                    <img src={`${process.env.REACT_APP_UPLOADS_URL}${immagine}`} alt={titolo} />
                </span>
            </Col>
            <Col lg={7}>
                <div className='room-block__info'>
                    <h3>
                        <Link to={`${permalink}/`}>
                            {titolo}
                        </Link>
                        {
                            prezzo &&
                            <span>&euro; {prezzo[0]}<sup>.{prezzo[1]}</sup>/Notte</span>
                        }
                    </h3>
                    {renderText(testo.substr(0, 180) + ' [...]')}
                    <RoomService data={icone} />
                    <Link className='btn btn-primary' to={`${permalink}/`}>
                        View Details
                        <i style={{ marginLeft: '8px' }} className="ion-android-arrow-forward"></i>
                    </Link>
                </div>

            </Col>
        </Row>
    )
}

export default RoomCard