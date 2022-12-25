import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, Input, Label, Form, Container, Row, Col } from 'reactstrap'

import { validateEmail } from '../../helper/Helper'
import API from '../../store/apiData'

import '../../assets/css/accesso.css'
import imagePage from '../../assets/images/login.jpg'
import IconaDivide from '../../assets/images/sign-up.png'

const Login = ({ setIsProtected }) => {

    // Nascondo il menu richiamando la funzione da App.js
    useEffect(() => {
        // setIsProtected(true)
    })

    const [messaggioServer, setMessaggioServer] = useState({})
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate();

    const usernameRef = useRef()
    const passwordRef = useRef()

    const params = useParams()
    const lang = params.lang

    const login = () => {
        const username = usernameRef.current.value
        const password = passwordRef.current.value

        // Controllo i campi
        if (!validateEmail(username)) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Email non valida.'
            })
            return
        } else if (password.length < 6) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Password non valida (minimo 8 caratteri).'
            })
            return
        }

        setUserData({
            username,
            password
        })
    }

    const sendLogin = () => {

        const link = `/${lang}/users/auth/`

        API.post(
            link,
            userData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then((response) => {
            const user = response.data.resource
            if (user.error) {
                setMessaggioServer({
                    tipo: 'danger',
                    messaggio: user.message
                })
                return
            }

            window.localStorage.setItem('tokenKey', user.data.token);
            API.defaults.headers.common["Authorization"] = `Bearer ${user.data.token}`
            navigate(`/${lang}/`)
        })
    }

    useEffect(() => {
        if (userData.username && userData.password) {
            sendLogin()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    const userFormChange = () => {
        setMessaggioServer({
            tipo: '',
            messaggio: ''
        })
    }

    return (
        <>
            <section className='login-box'>
                <div className='login-box__image'>
                    <img src={imagePage} alt='Accedi' />
                </div>
                <Form className='login-box__form'>
                    <Container fluid>
                        <Row>
                            <Col xs={12} className="title-container">
                                <h3><i className='ion-android-lock'></i> Sign In</h3>
                                <img src={IconaDivide} alt="Separa" />
                            </Col>
                            <Col xs={12}>
                                {
                                    messaggioServer.messaggio &&
                                    <Alert color={messaggioServer.tipo}>
                                        <i className="ion-alert-circled"></i>
                                        {messaggioServer.messaggio}
                                    </Alert>
                                }
                            </Col>
                            <Col xs={12}>
                                <Label htmlFor="email">E-mail:</Label>
                                <Input name="email" innerRef={usernameRef} onChange={() => userFormChange()} />
                            </Col>
                            <Col xs={12}>
                                <Label htmlFor="password">Password:</Label>
                                <Input type="password" name="password" innerRef={passwordRef} onChange={() => userFormChange()} />
                            </Col>
                            <Col xs={12}>
                                <Button onClick={() => login()}>
                                    Login <i className='ion-android-lock'></i>
                                </Button>
                            </Col>
                            <Col xs={12} className="text-center mt-5">
                                <p>
                                    Non sei registrato? <Link to={`/${lang}/users/signup/`}>
                                        <b>Registrati</b>
                                    </Link> o <Link to={`/${lang}/users/recovery/`}>
                                        <b>Recupera password</b>
                                    </Link>
                                </p>
                            </Col>
                            <Col xs={12}>
                                <p className="login-box__social-title">Sign up with social platforms</p>
                                <ul className="login-box__socials">
                                    <li>
                                        <a href="#/">
                                            <i className="ion-social-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <i className="ion-social-github"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <i className="ion-social-linkedin"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#/">
                                            <i className="ion-social-twitter"></i>
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </section>
        </>
    )
}

export default Login