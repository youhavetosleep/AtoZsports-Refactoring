const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors')
const hpp = require('hpp')
const dotenv = require('dotenv')
const helmet = require('helmet')
const router = require('./routes')
const db = require('./models')
const http = require('http')
const socketIo = require('socket.io')

dotenv.config()
const app = express()
const port = 80
const app = express()
const httpServer = http.createServer(app)
const io = socketIo(httpServer)

app.use('/', router)

httpServer.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동 중입니다.`)
})