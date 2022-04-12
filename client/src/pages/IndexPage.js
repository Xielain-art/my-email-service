import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../index";
import {Row, Spinner} from "react-bootstrap";
import Email from "../components/Email";
import {userApi} from "../http/userApi";
import {observer} from "mobx-react-lite";

const IndexPage = observer(() => {
    const {user} = useContext(Context)
    let [loading, setLoading] = useState(false)
    useEffect(() => {
        const getEmails = async () => {
            setLoading(true)
            const data = await userApi.getEmails()
            user.setEmails(data)
            setLoading(false)
        }
        getEmails()
    }, [])
    let emails = user.emails
    let content = emails.map((email) => {
        return <Email title={email.title}
                      body={email.body}
                      sender_email={email.sender_email}
                      created_at={email.createdAt}
                      key={email.id}/>
    })
    return (
        <Row className='d-flex flex-column gap-4'>
            {loading ? <Spinner animation={"grow"}/> : content}
        </Row>
    )
})

export default IndexPage