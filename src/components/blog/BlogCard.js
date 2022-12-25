import React from 'react'
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { convertData, renderText } from '../../helper/Helper'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BlogCard = ({ data: { titolo, testo, permalink, img_anteprima, inizio_pubblicazione } }) => {

    // Recupero la lingua
    const lang = useSelector(store => store.infoSlice.lang)

    return (
        <Card className="blog-card my-4">
            <div className='blog-card__image'>
                <img src={`${process.env.REACT_APP_UPLOADS_URL}/${img_anteprima}`} alt={titolo} />
            </div>
            <CardBody>
                <Link to={`/${lang}/blog/${permalink}`}>
                    <CardTitle tag="h5">
                        {titolo}
                    </CardTitle>
                </Link>
                <CardText>
                    {renderText(testo.substr(0, 380) + ' [...]')}
                </CardText>
                <CardText>
                    <small className="text-muted">
                        {convertData(inizio_pubblicazione, 'dl dd mt')}
                    </small>
                </CardText>
            </CardBody>
        </Card>
    )
}

export default BlogCard