import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import Lingue from './Lingue';
import Menu from './Menu'

import logo from '../assets/images/logo.svg'

const NavbarBlock = ({ lang, data }) => {

    return (
        <section className='nav-menu'>
            <Container>
                <Row>
                    <Col>
                        <img src={logo} alt="AndyLab" style={{ height: '56px' }} />
                    </Col>
                    <Col lg={8}>
                        <div>
                            <nav className="me-auto">
                                {data.menu && <Menu lang={lang} data={data.menu} />}
                            </nav>
                        </div>
                    </Col>
                    <Col>
                        {data.lingue && <Lingue lang={lang} data={data.lingue} />}
                    </Col>
                </Row>
            </Container>
        </section>

    )
}

export default NavbarBlock