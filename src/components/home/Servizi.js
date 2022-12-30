import React from 'react'
import { Container, Row, Col } from "reactstrap";
import ServiceCard from '../services/ServiceCard';

const Servizi = ({ data }) => {

    const servizi = data.data
    const icone = data.setting.icone

    return (
        servizi &&
        <Container style={{ margin: '80px auto', padding: '80px 0', borderBottom: '1px solid #f6f6f6', borderTop: '1px solid #f6f6f6' }}>
            <Row>
                {
                    servizi.map((item, index) => {
                        return (
                            <Col key={index}>
                                <ServiceCard icon={icone[(index + 1)]} data={item} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default Servizi