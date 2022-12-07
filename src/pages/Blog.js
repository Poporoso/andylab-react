import React, { useState } from 'react'
import API from '../store/apiData'

import { useEffect } from "react";
import Loading from '../components/Loading';
import { Col, Container, Row } from 'reactstrap';
import BlogCard from '../components/blog/BlogCard';
import HeaderPage from '../components/HeaderPage';
import Footer from '../components/Footer';

const Blog = ({ lang }) => {

    const [apiDataPage, setApiDataPage] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const dataTemplate = apiDataPage.resource?.template
    const blogList = apiDataPage?.blog_list

    useEffect(() => {
        setIsLoading(true)
        const link = `/${lang}/blog/`
        API.get(link).then((response) => {
            setApiDataPage(response.data.resource)
            setIsLoading(false)
        })
    }, [lang])

    console.log(blogList)

    return (
        <>
            <Loading status={isLoading} />
            <HeaderPage data={dataTemplate} />
            <Container className='py-5'>
                <Row>
                    <Col lg={8}>
                        <h1>Blog: {apiDataPage?.body?.titolo}</h1>
                        <Row>
                            <Col lg={12}>
                                {
                                    blogList && Object.entries(blogList).map((item, index) => {
                                        console.log(item[1]);
                                        return (
                                            <BlogCard key={index} data={item[1]} />
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        ***
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Blog