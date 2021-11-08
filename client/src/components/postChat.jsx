import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import io from 'socket.io-client'
import dotenv from 'dotenv'
import store from '../store/store'

dotenv.config()

const domain = process.env.REACT_APP_API_URL || 'http://localhost:80'
const socket = io.connect(domain)

const PostChat = ({ postId }) => {
  const userInfo = store.getState().user.loginSuccess
  let userNickName = ''
  let userId = ''
  if (userInfo) {
    userNickName = userInfo.loginSuccess.userData.nickname
    userId = userInfo.loginSuccess.userData.id
  }

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
      <ChatContainer>
        <form onSubmit={onMessageSubmit}>
          {/* <h1>Message</h1> */}
          {/* <div className="name-field">
            <input
              name="name"
              onChange={(e) => onTextChange(e)}
              value={state.name}
              label="Name"
            />
          </div> */}
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
          <button className="chat_btn">전 송</button>
        </form>
        <div className="render-chat">
          {/* <h1>Chat log</h1> */}
          {renderChat()}
        </div>
      </ChatContainer>
    </>
  )
}

const ChatContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  max-width: 800px;
  width: 800px;
  height: 300px;
  padding: 20px 20px 20px 20px;
  margin: 0px 0px 50px 0px;
  .render-chat {
    display: grid;
    flex-direction: column;
    position: absolute;
    /* grid-template-columns: repeat(2, 360px); */
    max-height: 200px;
    height: 100px;
    top: 0;
  }
  #outlined-multiline-static {
    display: flex;
    position: absolute;
    width: 580px;
    height: 25px;
    bottom: 20px;
  }
  .chat_btn {
    display: flex;
    position: absolute;
    right: 20px;
    bottom: 20px;
    /* height: 31px; */
    padding: 6px 10px 6px 10px;
  }
`

export default PostChat
