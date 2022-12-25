import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { renderText } from '../../../../helper/Helper'

const Slider = ({ images, data, options }) => {

    const infoWidget = data?.var
    const sliderList = images ? images : data.result.image_list

    return (
        sliderList &&
        <>
            {infoWidget?.titolo && <h2>{infoWidget?.titolo}</h2>}
            {infoWidget?.descrizione && <p>{renderText(infoWidget.descrizione)}</p>}
            <Carousel className='slider-widget' dynamicHeight={true}>
                {
                    sliderList.map((item, index) => {
                        return (
                            <div key={index}>
                                <img src={`${process.env.REACT_APP_UPLOADS_URL}${item.path}/${item.nome}-large.${item.ext}`} alt="alt" />
                                {
                                    options?.descrizione &&
                                    <p className="legend">
                                        {item.alt || item.descrizione || item.nome}
                                    </p>
                                }
                            </div>
                        )
                    })
                }
            </Carousel>
        </>
    )
}

export default Slider