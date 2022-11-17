import React from 'react'
import { Link } from 'react-router-dom'
import { renderText } from '../helper/renderText';
import convertData from '../helper/convertData'

import '../assets/css/article-card.css'

const ArticleCard = ({data}) => {

    const { id_news, titolo, testo, img_anteprima, permalink, inizio_pubblicazione, tags_name, tags_link } = data
    const tagsName = tags_name.split(',')
    const tagsLink = tags_link.split(',')

    return (
        <div className="blog-item padd-15" id={`blog-n-${id_news}`}>
            <div className="blog-item-inner shadow-dark">
                <div className="blog-img">
                    { img_anteprima && <img src={`${process.env.REACT_APP_URL_UPLOAD}/${img_anteprima}`} alt={titolo} /> }
                    <div className="blog-date">
                        {convertData(inizio_pubblicazione, 'dd ms aaaa')}
                    </div>
                </div>
                <div className="blog-info">
                    <Link to={`/${permalink}`}>
                        <h4 className="blog-title">{titolo}</h4>
                    </Link>
                    <p className="blog-description" dangerouslySetInnerHTML={renderText(testo.substr(0,148))}></p>
                    {
                        tagsLink.length > 1 && 
                         <p className="blog-tags">
                            Tags:
                            {
                                tagsName.slice(0, 3).map((item, index) => {
                                    return (
                                        <span key={index}>
                                            <Link to={`${tagsLink[index]}`} style={{marginLeft:'4px'}}>
                                                {item}
                                            </Link>, 
                                        </span>
                                    )
                                })
                            }
                        </p>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default ArticleCard