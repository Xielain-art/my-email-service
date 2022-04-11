require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const cors = require("cors");
const router = require('./routes/index')
const {Server} = require('socket.io')
const sequelize = require('./db')
const models = require('./models/models')

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api', router)


const server = http.createServer(app)
const io = new Server(server)
let counter = 0
io.on('connection', (socket) => {
    socket.broadcast.emit('user connected', 'user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
    socket.on('chat message', (msg) => {
        io.emit('chat message', {msg, counter})
    })
})
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        server.listen(PORT, () => {
            console.log('Server started on', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}
start()

module.exports = io

