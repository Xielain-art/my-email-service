require('dotenv').config()
const cors = require("cors");
const express = require('express')
const http = require('http')
const router = require('./routes/index')
const {Server} = require('socket.io')
const sequelize = require('./db')
const models = require('./models/models')
const path = require("path");

const PORT = process.env.PORT || 5000
const app = express()


app.use(cors())
app.use(express.json())
app.use('/api', router)
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
})
io.on('connection', (socket) => {


    socket.on('email', (data) => {
        data.ids.forEach(el => socket.broadcast.emit(el, data.email))
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


