import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../index";
import {Accordion, Row, Spinner} from "react-bootstrap";
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
                      sender_id={email.sender_id}
                      created_at={email.createdAt}
                      key={email.id}
                      email_id={email.id}
        />
    })
    return (

        <>
            <Accordion className='mt-3'>
                {loading ? <Spinner animation={"grow"}/> : content}
            </Accordion>
        </>

    )
})

export default IndexPage