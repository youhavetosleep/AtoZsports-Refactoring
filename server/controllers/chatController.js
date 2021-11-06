const { Chat, User, FavoritePost, Post } = require('../models')

//채팅방 관리
module.exports = (io) => {
  io.on('connection', (socket) => {
    let isMyPost = false
    let isMyFavorite = false
    let nowUserId
    let nowPostId
    console.log('new connection')
    socket.on('enter_room', async (roomNum, userName, userId) => {
      nowPostId = roomNum
      nowUserId = userId
      socket['nickname'] = userName
      socket.join(roomNum)

      let findFavoritePost = await FavoritePost.findOne({
        where: {
          userId: userId,
          postId: roomNum
        }
      })

      let findWhoWritePost = await Post.findOne({
        where: {
          id: roomNum
        }
      })

      if (!!findFavoritePost) isMyFavorite = true
      if (findWhoWritePost.dataValues.userId === userId) isMyPost = true

      Chat.findAll({
        include: [{ model: User, attributes: ['nickname'] }],
        order: [['createdAt']],
        where: { postId: roomNum }
      }).then((message) => {
        let chatData = []
        message.map((el) => {
          chatData.push({
            name:
              el.dataValues.User.nickname === userName
                ? 'YOU'
                : el.dataValues.User.nickname,
            message: el.dataValues.comment
          })
        })
        socket.emit('load all messages', chatData)
      })
      socket.to(roomNum).emit('welcome', socket.nickname)
    })

    socket.on('message', ({ name, userId, message, roomNum }) => {
      Chat.create({
        comment: message,
        userId: userId,
        postId: roomNum
      }).then(() => {
        io.to(roomNum).emit('message', { name, message })
      })
    })

    socket.on('disconnecting', async () => {
      // 이건 내장 메소드
      if (isMyPost === true) {
        let findLastChat = await Chat.findOne({
          order: [['createdAt', 'DESC']],
          where: {
            postId: nowPostId
          }
        })
        await Post.update(
          {
            lastReadTime: findLastChat.dataValues.createdAt
          },
          { where: { id: nowPostId } }
        )
      }

      if (isMyFavorite === true) {
        let findLastChat = await Chat.findOne({
          order: [['createdAt', 'DESC']],
          where: {
            postId: nowPostId
          }
        })
        await FavoritePost.update(
          {
            lastReadTime: findLastChat.dataValues.createdAt
          },
          { where: { userId: nowUserId, postId: nowPostId } }
        )
      }
      socket.rooms.forEach((room) =>
        socket.to(room).emit('bye', socket.nickname)
      )
    })
  })
}
