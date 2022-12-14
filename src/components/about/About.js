import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import { renderText } from '../../helper/Helper';

import '../../assets/css/about.css'

const About = ({ data }) => {

    const { titolo, testo, immagine, permalink } = data

    return (
        data &&
        <Container fluid>
            <Row>
                <Col>
                    <small className="text-uppercase" style={{ color: '#9B5DE5' }}>
                        subheadline
                    </small>
                    <h1 className="mb-4 display-4" style={{ fontWeight: 600 }}>
                        {titolo}
                    </h1>
                    <div className="text-secondary" style={{ lineHeight: 2 }}>
                        {renderText(testo.substr(0, 480))}
                    </div>
                    <a href="#/" style={{ color: '#9B5DE5', width: '240px' }} className="btn px-4 py-3 text-white d-flex align-items-center justify-content-between">
                        <span>Download Profile</span>
                    </a>
                    <Link className='btn btn-primary' to={`${permalink}`}>
                        <span>Vai a leggere</span>
                    </Link>
                </Col>
                <Col
                    style={{
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundImage: `url(${process.env.REACT_APP_UPLOADS_URL}/${immagine})`
                    }
                    }>
                </Col>
            </Row>
        </Container>
    )
}

export default About