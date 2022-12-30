import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Container, Row } from 'reactstrap'

import logo from '../../assets/images/logo-footer.svg'

const Footer = () => {

    const store = useSelector(store => store.infoSlice.data.info)
    const indirizzi = store?.info.indirizzo
    const titolo_sito = store?.info.titolo_sito
    const cellulari = store?.info.cellulare

    return (
        <footer className="footer">
            <Container className="center-footer">
                <Row>
                    <Col md={3} lg={4}>
                        <Row className="address">
                            <Col>
                                <img src={logo} alt={titolo_sito} style={{ height: 108, marginBottom: 14 }} />
                                <h4>{titolo_sito}</h4>
                            </Col>
                            <Col xs={12}>
                                {
                                    indirizzi &&
                                    indirizzi.map((item, index) => {
                                        return (
                                            item &&
                                            <span key={index}>
                                                <i className='ion-ios-location'></i>
                                                {item}
                                            </span>
                                        )
                                    })
                                }
                                {
                                    cellulari &&
                                    cellulari.map((item, index) => {
                                        return (
                                            item &&
                                            <span key={index}>
                                                <i className='ion-ios-telephone'></i>
                                                {item}
                                            </span>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col md={9} lg={8}>
                        <Row>
                            <Col md={4}>
                                <h2 className="footer-heading">Information</h2>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="#/">
                                            <span className="ion-ios-checkmark-outline"></span>
                                            Our Company
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <span className="ion-ios-checkmark-outline"></span>
                                            Data
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <span className="ion-ios-checkmark-outline"></span>
                                            Pricing
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <span className="ion-ios-checkmark-outline"></span>
                                            Contact Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <span className="ion-ios-checkmark-outline"></span>
                                            Support
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                            <Col md={4}>
                                <h2 className="footer-heading">Application</h2>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="#/">
                                            <span className="ion-ios-checkmark-outline"></span>
                                            Download</a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <span className="ion-ios-checkmark-outline"></span>
                                            Bike Provider
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <span className="ion-ios-checkmark-outline"></span>
                                            How to Used
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                            <Col md={4}>
                                <h2 className="footer-heading">API</h2>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="#/">
                                            <span className="ion-ios-checkmark-outline"></span>
                                            Documentation
                                        </a></li>
                                    <li>
                                        <a href="#/">
                                            <span className="ion-ios-checkmark-outline"></span>
                                            Credential</a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <span className="ion-ios-checkmark-outline"></span>
                                            Developer info
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <div className='copyright'>
                <Container>
                    <Row>
                        <Col>
                            <span>
                                Copyright ©All rights reserved | This template is made with <i className="ion-ios-heart" aria-hidden="true"></i> by Andy
                            </span>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    )
}

export default Footer