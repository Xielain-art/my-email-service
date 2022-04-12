import React, {useContext} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {INDEX_PAGE, LOGIN_PAGE, MY_EMAIL, SEND_EMAILS} from "../utils/routes";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const NavBar = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const isAuth = user.isAuth
    const logout = () => {
        localStorage.clear()
        user.setIsAuth(false)
        user.setUser({})
        navigate(LOGIN_PAGE)
    }
    return (
        <Navbar bg="primary"
                variant="dark">
            <Container>
                <Navbar.Brand as={Link}
                              to={INDEX_PAGE}
                >
                    MyEmailService
                </Navbar.Brand>
                <Nav className='ms-auto'>
                    {user.isAuth && <LinkContainer to={INDEX_PAGE}>
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>}
                    {user.isAuth && <LinkContainer to={SEND_EMAILS}>
                        <Nav.Link>Send Emails</Nav.Link>
                    </LinkContainer>}
                    {isAuth && <Navbar.Text>Your email: {user.user.email}</Navbar.Text>}
                    {!isAuth ?
                        <LinkContainer to={LOGIN_PAGE}>
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        :
                        <Button variant='outline-dark'
                                onClick={logout}
                                className={'ms-3'}>Logout</Button>
                    }

                </Nav>
            </Container>
        </Navbar>
    )
})

export default NavBar