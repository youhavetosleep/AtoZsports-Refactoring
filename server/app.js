const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const router = require('./routes')

dotenv.config()
const app = express()
const port = process.env.PORT || 80

app.use(morgan('dev'))

app.use('/', router)

app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동 중입니다.`)
})