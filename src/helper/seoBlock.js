import React from 'react'
import { Helmet } from 'react-helmet'

export const seoBlock = (props) => {

    const { title, metaDesc } = props.meta
    const siteName = process.env.REACT_APP_SITE_NAME

    return (
        <Helmet>
            <title>{title} | {siteName}</title>
            <meta name="description" content={metaDesc} />
        </Helmet>
    )
}