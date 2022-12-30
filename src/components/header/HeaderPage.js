import React from 'react'
import { renderText } from '../../helper/Helper'

const HeaderPage = ({ options }) => {

    const { title, subTitle, urlImage = '' } = options

    return (
        options &&
        <div className="sample-header" style={{ backgroundImage: `url("${process.env.REACT_APP_UPLOADS_URL}/${urlImage}")` }}>
            <div className="sample-header-section">
                <h1>{renderText(title)}</h1>
                <div>{renderText(subTitle)}</div>
            </div>
        </div>
    )
}

export default HeaderPage