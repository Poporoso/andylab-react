import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert, Button, Input, Label, Form, Container, Row, Col } from 'reactstrap'

import { validateEmail } from '../../helper/Helper'
import API from '../../store/apiData'

import '../../assets/css/accesso.css'
import imagePage from '../../assets/images/signup.jpg'
import IconaDivide from '../../assets/images/sign-up.png'

const Signup = () => {

    const [messaggioServer, setMessaggioServer] = useState({})
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })

    // const navigate = useNavigate();

    const usernameRef = useRef()
    const passwordRef = useRef()
    const passwordReRef = useRef()
    const cognomeRef = useRef()
    const nomeRef = useRef()

    const params = useParams()
    const lang = params.lang

    const login = () => {
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        const passwordRe = passwordReRef.current.value
        const cognome = cognomeRef.current.value
        const nome = nomeRef.current.value

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
        } else if (password !== passwordRe) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Attenzione le password non coincidono'
            })
            return
        } else if (!nome || !cognome) {
            setMessaggioServer({
                tipo: 'danger',
                messaggio: 'Tutti i campi sono obbligatori'
            })
            return
        }

        setUserData({
            username,
            password,
            passwordRe,
            nome,
            cognome
        })
    }

    const sendLogin = () => {

        const link = `/${lang}/users/signup/`

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

            setMessaggioServer({
                tipo: 'success',
                messaggio: 'Complimenti, ti sei registrato'
            })

            // Svuoto i campi
            usernameRef.current.value = ''
            passwordRef.current.value = ''
            passwordReRef.current.value = ''
            cognomeRef.current.value = ''
            nomeRef.current.value = ''
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
                                <h3><i className='ion-android-contact'></i> Registrazione</h3>
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
                                <Label htmlFor="nome">Nome</Label>
                                <Input innerRef={nomeRef} name="nome" onChange={() => userFormChange()} />
                            </Col>
                            <Col xs={12}>
                                <Label htmlFor="cognome">Cognome</Label>
                                <Input innerRef={cognomeRef} name="cognome" onChange={() => userFormChange()} />
                            </Col>
                            <Col xs={12}>
                                <Label htmlFor="email">E-mail:</Label>
                                <Input innerRef={usernameRef} name="email" onChange={() => userFormChange()} />
                            </Col>
                            <Col xs={12}>
                                <Label htmlFor="pass">Password:</Label>
                                <Input type="password" innerRef={passwordRef} name="pass" onChange={() => userFormChange()} />
                            </Col>
                            <Col xs={12}>
                                <Label htmlFor="repass">Ripeti password:</Label>
                                <Input type="password" innerRef={passwordReRef} name="repass" onChange={() => userFormChange()} />
                            </Col>
                            <Col xs={12}>
                                <Button onClick={() => login()}>
                                    Registrati <i className='ion-android-arrow-forward'></i>
                                </Button>
                            </Col>
                            <Col xs={12} className="text-center mt-5">
                                <p>
                                    Sei già registrato? <Link to={`/${lang}/users/login/`}>
                                        <b>vai al login</b>
                                    </Link> o <Link to={`/${lang}/users/recovery/`}>
                                        <b>Recupera password</b>
                                    </Link>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </section>
        </>
    )
}

export default Signup