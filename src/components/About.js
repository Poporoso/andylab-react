import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import { renderText } from '../helper/renderText';

import '../assets/css/about.css'

const About = ({ data }) => {

    const { titolo, testo, img_anteprima, permalink } = data[0]

    return (
        <Container fluid>
            <Row>
                <Col>
                    <small className="text-uppercase" style={{ color: '#9B5DE5' }}>subheadline</small>
                    <h1 className="mb-4 display-4" style={{ fontWeight: 600 }}>
                        {titolo}
                    </h1>
                    <p className="text-secondary" style={{ lineHeight: 2 }} dangerouslySetInnerHTML={renderText(testo.substr(0, 480))}>
                    </p>
                    <a href="#/" style={{ color: '#9B5DE5', width: '240px' }} className="btn px-4 py-3 text-white d-flex align-items-center justify-content-between">
                        <span>Download Profile</span>
                    </a>
                    <Link className='btn btn-primary' to={`${permalink}`}>
                        <span>Vai a leggere</span>
                    </Link>
                </Col>
                <Col style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `url(${process.env.REACT_APP_UPLOADS_URL}/${img_anteprima})` }}>

                </Col>
            </Row>
        </Container>
    )
}

export default About