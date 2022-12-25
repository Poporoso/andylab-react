import React from 'react'
import { Row, Col } from "reactstrap";
import ArticleCard from '../blog/ArticleCard'

const BlockBlog = ({ data }) => {

    return (
        <Row className='blog'>
            {
                data.map((item) => {
                    return (
                        <Col xxl={4} key={item.id_news}>
                            <ArticleCard data={item} />
                        </Col>
                    )
                })
            }
        </Row>
    )

}

export default BlockBlog