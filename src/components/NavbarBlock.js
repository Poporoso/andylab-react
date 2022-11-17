import React from 'react'
import {Container, Row, Col} from 'reactstrap';
import Lingue from './Lingue';
import Menu from './Menu'

const NavbarBlock = ({ lang, data }) => {

    return (
        <Container >
            <Row>
                <Col>
			        AndyLab
                </Col>
                <Col lg={8}>
                    <div>
                        <nav className="me-auto">
                            { data.menu && <Menu lang={lang} data={data.menu} /> }
                        </nav>
                    </div>
                </Col>
                <Col>
			        { data.lingue && <Lingue lang={lang} data={data.lingue} />}
                </Col>
            </Row>
        </Container>
    )
}

export default NavbarBlock