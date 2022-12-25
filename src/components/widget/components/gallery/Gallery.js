import React from 'react'
import { renderText } from '../../../../helper/Helper'
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { Col, Row } from 'reactstrap';

const Gallery = ({ data }) => {

    const infoWidget = data.var
    const galleryList = data.result.image_list

    return (

        galleryList && <>
            <h2>{infoWidget?.titolo}</h2>
            {infoWidget?.descrizione && <p>{renderText(infoWidget.descrizione)}</p>}
            <LightGallery
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames="gallery-widget"
                speed={500}
            >
                <Row>
                    {
                        galleryList.map((item, index) => {
                            const patImg = `${process.env.REACT_APP_UPLOADS_URL}${item.path}`
                            const imgLarge = `${patImg}/${item.nome}-large.${item.ext}`
                            const imgThumbs = imgLarge.replace('-large', '-thumbs')
                            const title = item.descrizione || item.alt || item.nome
                            const alt = item.alt || item.descrizione || item.nome

                            return (
                                <Col key={index} lg={4} className="mb-4">
                                    <a className='gallery-widget__item' href={imgLarge} title={title}>
                                        <img alt={alt} src={imgThumbs} />
                                    </a>
                                </Col>
                            )
                        })
                    }
                </Row>
            </LightGallery>
        </>
    )
}

export default Gallery