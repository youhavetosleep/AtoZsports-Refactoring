import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import dotenv from 'dotenv'
import store from '../store/store'

dotenv.config()

const domain = process.env.REACT_APP_API_URL || 'http://localhost:80'
const socket = io.connect(domain)

const PostChat = ({ postId }) => {
  let userInfo = store.getState().user
  let userNickName = userInfo.loginSuccess.userData.nickname
  let userId = userInfo.loginSuccess.userData.id

  // 메세지, 사용자 닉네임, 게시물 id값을 저장해주자
  const [state, setState] = useState({
    message: '',
    name: userNickName,
    userId: userId,
    roomNum: postId
  })
  // 채팅의 내용을 저장해두는 곳
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.emit('enter_room', state.roomNum, state.name, state.userId)

    // 현재 게시물에 저장된 대화들을 불러오는 곳
    socket.on('load all messages', (data) => {
      let loadData = []
      data.forEach((message) => {
        loadData.push(message)
      })
      setChat(loadData)
    })
  }, [])

  socket.on('welcome', (user) => {
    let text = { name: '환영합니다!!', message: `${user} 입장!!` }
    setChat([...chat, text])
  })

  socket.on('bye', (user) => {
    let text = { name: '다음 사용자가 웹을 종료했습니다.', message: `${user}` }
    setChat([...chat, text])
  })

  socket.on('room_change', (rooms) => {
    console.log(rooms)
  })

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      if (name === state.name) {
        setChat([...chat, { name: 'YOU', message }])
      } else {
        setChat([...chat, { name, message }])
      }
    })
  })

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    e.preventDefault()
    const { name, message, roomNum, userId } = state
    socket.emit('message', { name, userId, message, roomNum })
    setState({ message: '', name, roomNum, userId })
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}:<span>{message}</span>
        </h3>
      </div>
    ))
  }

  return (
    <>
      <div className="card">
        <form onSubmit={onMessageSubmit}>
          <h1>Message</h1>
          <div className="name-field">
            <input
              name="name"
              onChange={(e) => onTextChange(e)}
              value={state.name}
              label="Name"
            />
          </div>
          <div>
            <input
              name="message"
              onChange={(e) => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
            />
          </div>
          <button>Send Message</button>
        </form>
        <div className="render-chat">
          <h1>Chat log</h1>
          {renderChat()}
        </div>
      </div>
    </>
  )
}

export default PostChat
