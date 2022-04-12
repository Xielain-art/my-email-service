const {Email} = require('../models/models')

class EmailController {
    async sendEmail(req, res) {
        const senderId = req.user.id
        const senderEmail = req.user.email
        let {title, body, forIds} = req.body
        if (!forIds) {
            forIds = [senderId]
        }
        try {
            let emails = []
            for (const id of forIds) {
                const email = await Email.create({
                    title,
                    body,
                    sender_id: senderId,
                    userId: id,
                    sender_email: senderEmail
                })
                emails.push(email)
            }
            return res.json({emails})
        } catch (e) {
            return res.status(400).json({message: 'Error'})
        }
    }

    async getEmails(req, res) {
        const {id} = req.user
        try {
            const emails = await Email.findAll({where: {userId: id}})
            return res.json(emails)
        } catch (e) {
            res.status(400).json({message: 'Error'})
        }
    }

}

module.exports = new EmailController()