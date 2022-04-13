import React from 'react'
import {Accordion, Card, Row} from "react-bootstrap";
import parse from 'html-react-parser';


const Email = ({title, body, sender_email, created_at, email_id}) => {
    return (
        <Accordion.Item eventKey={email_id}>
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
                <div>{parse(body)} <br/>
                    From: {sender_email} <br/>
                    Date: {created_at}</div>
            </Accordion.Body>
        </Accordion.Item>

    )
}

export default Email