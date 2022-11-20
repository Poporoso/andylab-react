import React from 'react'
import GalleryCard from './GalleryCard'

import '../assets/css/gallery-block.css'

const GalleryBlock = (props) => {

    const GalleriesList = props.data

    return (
        <div className="gallery-image">
            {
                GalleriesList.map((itemsGall) => {
                    const gallery = itemsGall.images_list
                    return (
                        gallery.map((item, index) => {
                            return (
                                <GalleryCard key={index} data={item}/>
                            )
                        })                        
                    )
                })
            }
        </div>
    )
}

export default GalleryBlock