import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import API from '../../store/apiData'

import { useEffect } from "react";
import Loading from '../../components/block/Loading';
import BlogCard from '../../components/blog/BlogCard';
import HeaderPage from '../../components/header/HeaderPage';
import Footer from '../../components/footer/Footer';
import SearchBox from '../../components/search/SearchBox';
import BlogCategorie from '../../components/blog/sidebar/BlogCategorie';
import BlogRecenti from '../../components/blog/sidebar/BlogRecenti';
import BlogTags from '../../components/blog/sidebar/BlogTags';
import NoArticle from '../../components/blog/NoArticle';
import Paginazione from '../../components/paginazione/Paginazione';
import { renderText } from '../../helper/Helper';

const Blog = () => {

    const [dataPage, setDataPage] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [dataCall, setDataCall] = useState(0)

    /** Parametri link */
    const params = useParams()
    const blogPage = params.page
    const blogSection = params.section
    const blogKeyword = params.keyword

    // Recupero la lingua
    const lang = params.lang
    const urlSearch = `/${lang}/blog/search`

    const blogList = dataPage?.blog_list
    const categorieList = dataPage?.lista_categorie
    const recentiList = dataPage?.post_plus
    const tagsList = dataPage?.tags_news
    const html = dataPage?.html

    const paginazione = dataPage?.paginazione

    useEffect(() => {
        setIsLoading(true)

        // se manca la lingua mi evito una chiamata api
        if (!lang) {
            return
        }

        let base = `/${lang}/blog`
        let link;

        if (blogKeyword) {
            if (blogPage === undefined) {
                link = `${base}/${blogSection}/${blogKeyword}/`
            } else {
                link = `${base}/${blogSection}/${blogKeyword}/${blogPage}/`
            }
        } else {
            if (blogPage === undefined) {
                link = `${base}/`
            } else {
                link = `${base}/${blogPage}/`
            }
        }

        API.get(link).then((response) => {
            setDataPage(response.data.resource)
            setDataCall(response.data.data_call)
        })

    }, [lang, blogPage, blogSection, blogKeyword])

    useEffect(() => {
        if (dataCall) {
            setIsLoading(false)
        }
        window.scrollTo(0, 0)
    }, [dataCall])

    return (
        <>
            <Loading status={isLoading} />
            <HeaderPage options={{
                title: html?.title,
                subTitle: html?.sub_title,
                urlImage: html?.image_preview
            }} />
            <Container className='py-5'>
                <Row>
                    <Col lg={8}>
                        <h1>{dataPage?.body?.titolo}</h1>
                        <p>{renderText(dataPage?.body?.testo)}</p>
                        <Row>
                            <Col lg={12}>
                                {
                                    blogList ? Object.entries(blogList).map((item, index) => {
                                        return (
                                            <BlogCard key={index} data={item[1]} />
                                        )
                                    }) : <NoArticle />
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <Paginazione data={paginazione} />
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <SearchBox url={urlSearch} />
                        <BlogCategorie data={categorieList} />
                        <BlogRecenti data={recentiList} />
                        <BlogTags data={tagsList} />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Blog