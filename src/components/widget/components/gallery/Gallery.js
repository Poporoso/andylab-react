import React from 'react'
import { Gallery as GalleryBox, Item } from 'react-photoswipe-gallery'
import { renderText } from '../../../../helper/Helper'
import { Col, Row } from 'reactstrap';

import 'photoswipe/dist/photoswipe.css'
import '../../../../assets/css/gallery.css'

const Gallery = ({ data }) => {

    const infoWidget = data.var
    const galleryList = data.result.image_list

    return (
        galleryList && <>
            <h2>{infoWidget?.titolo}</h2>
            {infoWidget?.descrizione && <p>{renderText(infoWidget.descrizione)}</p>}

            <GalleryBox>
                <Row className="gallery-widget">
                    {
                        galleryList.map((item, index) => {
                            const imgLarge = `${process.env.REACT_APP_UPLOADS_URL}${item.img_preview_large}`
                            const imgThumbs = `${process.env.REACT_APP_UPLOADS_URL}${item.img_preview_small}`
                            const title = item.descrizione || item.alt || item.nome
                            return (
                                <Col key={index} lg={4} className="mb-4">
                                    <Item
                                        original={imgLarge}
                                        thumbnail={imgThumbs}
                                        width="1024"
                                        height="768"
                                    >
                                        {({ ref, open }) => (
                                            <span className='gallery-widget__item' title={title}>
                                                <img ref={ref} onClick={open} src={imgThumbs} alt={title} />
                                            </span>
                                        )}
                                    </Item>
                                </Col>
                            )
                        })
                    }
                </Row>
            </GalleryBox>
        </>
    )
}

export default Gallery