import React from 'react'
import {Container} from "react-bootstrap";
import {Outlet} from 'react-router-dom'
const Layout = () => {
    return (
        <Container>
            123
            <Outlet/>
        </Container>
    )
}

export default Layout