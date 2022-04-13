import React, {useContext, useEffect, useState} from 'react'
import {Accordion, Button, Card, Container, Form, ListGroup} from "react-bootstrap";
import {Context} from "../index";
import {userApi} from "../http/userApi";
import {useMessage} from "../hooks/message.hook";
import {observer} from "mobx-react-lite";


const SendEmailsPage = observer(() => {
    const {user} = useContext(Context)
    const [emailTitle, setEmailTitle] = useState('')
    const [emailBody, setEmailBody] = useState('')
    const [sending, setSending] = useState(false)
    const [editor] = useState(() => withReact(createEditor()))
    const message = useMessage()
    useEffect(() => {
        const getUsers = async () => {
            const data = await userApi.getUsers()
            user.setUsers(data)
        }
        getUsers()
    }, [])
    const initialValue = [
        {
            type: 'paragraph',
            children: [{text: 'A line of text in a paragraph.'}],
        },
    ]


    const sendEmail = async (e) => {
        e.preventDefault()
        if (emailTitle !== '' && emailBody !== '') {
            setSending(true)
            await userApi.sendEmail(emailTitle, emailBody, user.selectedUsers)
            message('Success!', 'success')
            setEmailTitle('')
            setEmailBody('')
            user.clearSelectedUsers()
            setSending(false)
        } else {
            message('Enter correct values!', 'error')
        }

    }
    return (
        <Container className='d-flex justify-content-center align-items-center'
        >
            <Card style={{width: '50%'}}>
                <Card.Header as="h5">Send Email</Card.Header>
                <Card.Body>
                    <Form className='d-flex flex-column gap-2'>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Header>
                                Select Users
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className='d-flex justify-content-between mb-2'>
                                    <Button onClick={() => {
                                        user.selectAll()
                                    }}>
                                        Select All
                                    </Button>
                                    <Button onClick={() => {
                                        user.unselectAll()
                                    }}>
                                        Unselect All
                                    </Button></div>
                                <ListGroup>
                                    {user.users.map(u => {
                                        return <ListGroup.Item key={u.id}
                                                               onClick={() => user.setSelectedUsers(u.id)}
                                                               className='unselectable'
                                                               style={{
                                                                   backgroundColor: user.selectedUsers.some(id => id === u.id)
                                                                       ? 'blue'
                                                                       : '',
                                                                   cursor: 'pointer',
                                                               }}>
                                            {u.email}</ListGroup.Item>
                                    })}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion>
                        <Form.Control placeholder='Email title'
                                      value={emailTitle}
                                      onChange={e => setEmailTitle(e.target.value)}/>
                        {/*<Form.Control placeholder='Email body'*/}
                        {/*              value={emailBody}*/}
                        {/*              as={'textarea'}*/}
                        {/*              onChange={e => setEmailBody(e.target.value)}*/}
                        {/*/>*/}

                        <Button disabled={sending}
                                onClick={sendEmail}>Send Email</Button>
                    </Form>

                </Card.Body>
            </Card>


        </Container>
    )
})

export default SendEmailsPage