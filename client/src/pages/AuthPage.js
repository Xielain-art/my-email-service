import React, {useContext, useEffect, useState} from 'react'
import {Button, Card, Container, Form} from "react-bootstrap";
import {INDEX_PAGE, LOGIN_PAGE, REGISTER_PAGE} from "../utils/routes";
import {Link, useLocation} from "react-router-dom";
import {useHttp} from "../hooks/htt.hook";
import {userApi} from "../http/userApi";
import {useMessage} from "../hooks/message.hook";
import {useNavigate} from 'react-router-dom'
import {Context} from "../index";


const AuthPage = () => {
    const path = useLocation().pathname
    const isLogin = path === LOGIN_PAGE || path === INDEX_PAGE
    const [request, errors, clearErrors, loading] = useHttp()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const message = useMessage()
    const navigate = useNavigate()
    const {user} = useContext(Context)

    const setUser = (data) => {
        user.setIsAuth(true)
        user.setUser(data)
    }

    useEffect(() => {
        if (errors) {
            errors.forEach((e) => {
                message(e.msg, 'error')
            })
        }
        clearErrors()
    }, [errors, clearErrors, message])
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onRegister = async (e) => {
        e.preventDefault()
        try {
            const data = await request(userApi.register, {email, password})
            setUser(data)
            setEmail('')
            setPassword('')
            navigate(INDEX_PAGE)
        } catch (e) {
        }
    }
    const onLogin = async (e) => {
        e.preventDefault()
        try {
            const data = await request(userApi.login, {email, password})
            setUser(data)
            setEmail('')
            setPassword('')
            navigate(INDEX_PAGE)
        } catch (e) {
        }
    }
    return (

        <Container className='d-flex justify-content-center align-items-center'
                   style={{height: window.innerHeight - 100}}>

            <Card style={{width: '50%'}}>
                <Card.Header as="h5">{isLogin ? 'Login' : 'Register'}</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3"
                                    controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email"
                                          placeholder="Enter email"
                                          value={email}
                                          onChange={onChangeEmail}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3"
                                    controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Password"
                                          value={password}
                                          onChange={onChangePassword}/>
                        </Form.Group>
                        <Button disabled={loading}
                                variant="primary"
                                type="submit"
                                onClick={isLogin ? onLogin : onRegister}>
                            {isLogin ? 'Login' : 'Register'}
                        </Button>

                        <Form.Group>
                            <Form.Text>
                                {isLogin ? "Don't have an account? " : 'Have an account? '}
                                <Link to={isLogin ? REGISTER_PAGE : LOGIN_PAGE}>
                                    {isLogin ? 'Register' : 'Login'}
                                </Link>
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AuthPage