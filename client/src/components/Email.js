import React from 'react'
import {Card} from "react-bootstrap";

const Email = ({title, body, sender_email, created_at}) => {
    return (
        <Card className="text-center">
            <Card.Header>From {sender_email}</Card.Header>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {body}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">{created_at}</Card.Footer>
        </Card>
    )
}

export default Email