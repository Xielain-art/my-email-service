import React, {useContext} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {Button, Card, Container, Form} from "react-bootstrap";
import {LOGIN_PAGE, REGISTER_PAGE} from "../utils/routes";

const SendEmailsPage = () => {
    return (
        <Container className='d-flex justify-content-center align-items-center'
                   style={{height: window.innerHeight - 100}}>
            <Card style={{width: '50%'}}>
                <Card.Header as="h5">Send Email</Card.Header>
                <Card.Body>
                  
                </Card.Body>
            </Card>


        </Container>
    )
}

export default SendEmailsPage