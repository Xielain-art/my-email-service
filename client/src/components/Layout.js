import React from 'react'
import {Outlet} from 'react-router-dom'
import NavBar from "./NavBar";
import {Container} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {observer} from "mobx-react-lite";

const Layout = observer(() => {
    return (

        <>
            <NavBar/>
            <ToastContainer/>
            <Container>
                <Outlet/>
            </Container>
        </>
    )
})

export default Layout