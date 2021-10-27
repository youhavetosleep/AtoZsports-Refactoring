const { Chat } = require('../models')

//채팅방 관리
module.exports = io => {
    io.on('connection', client => {
        console.log("new connection: ", client)
    })
}