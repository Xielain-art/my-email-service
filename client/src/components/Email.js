import React, {useContext} from 'react'
import {Accordion, Button, Card, Row} from "react-bootstrap";
import parse from 'html-react-parser';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {SEND_EMAILS} from "../utils/routes";


const Email = ({title, body, sender_email, created_at, email_id, sender_id}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    return (
        <Accordion.Item eventKey={email_id}>
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
                <div>{parse(body)} <br/>
                    From: {sender_email} <br/>
                    Date: {created_at}</div>
                <br/>
                <Button onClick={() => {
                    user.setSelectedUsers(sender_id)
                    navigate(SEND_EMAILS)
                }}>Reply</Button>
            </Accordion.Body>
        </Accordion.Item>

    )
}

export default Email