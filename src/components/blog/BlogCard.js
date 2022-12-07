import React from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

const BlogCard = ({ titolo, testo, img_anteprima }) => {

    return (
        <Card className="my-2">
            <CardImg alt="Card image cap" src={`${process.env.REACT_APP_UPLOADS_URL}/${img_anteprima}`} style={{ height: 288 }} top width="100%" />
            <CardBody>
                <CardTitle tag="h5">
                    Card Title
                </CardTitle>
                <CardText>
                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </CardText>
                <CardText>
                    <small className="text-muted">
                        Last updated 3 mins ago
                    </small>
                </CardText>
            </CardBody>
        </Card>
    )
}

export default BlogCard