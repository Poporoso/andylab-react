import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'

const Breadcrumbs = ({ data }) => {

    const breadcrumps = data

    // Recupero la lingua
    const info = useSelector(store => store.infoSlice)
    const lang = info.lang

    return (
        <Breadcrumb listTag="div">
            <BreadcrumbItem tag="span">
                <Link to={`/${lang}/`}>
                    Home
                </Link>
            </BreadcrumbItem>
            {
                breadcrumps && breadcrumps.map((item, index) => {
                    const nome = item[0]
                    const link = item[1]
                    return (
                        <BreadcrumbItem key={index} tag="span">
                            {
                                link ?
                                    <Link to={`/${lang}/${link}`}>
                                        {nome}
                                    </Link> :
                                    <span>
                                        {nome}
                                    </span>
                            }
                        </BreadcrumbItem>
                    )
                })
            }
        </Breadcrumb>
    )
}

export default Breadcrumbs