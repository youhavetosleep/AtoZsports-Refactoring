import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import instance from '../api'
import GlobalStyle from '../globalStyle/globalStyle'
import { USER_PASSWORD } from '../_actions/types'
import { userPassword } from '../_actions/user.action'

function EditPasswordModal({ setEditPswordModal, token }) {
  const modalEl = useRef()
  const dispatch = useDispatch()

  const [password, setPassword] = useState('')
  const [messagePassword, setMessagePassword] = useState('')
  const [beforeUserPsword, setbeforeUserPsword] = useState('')

  // console.log(token)
  // console.log(password)
  // (password) 최소 8 자, 최소 각 1자의 문자, 숫자, 특수 문자
  const password_Reg =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/

    const hadleChangePassword = () => {
  
      dispatch(userPassword(token, password))
      .then((res) => {
        console.log(res)
      })
      setEditPswordModal(false)
    }

  // 비밀번호 확인
  // const checkPassword = async () => {
  //   if (beforeUserPsword password)) {
  //     setMessagePassword('현재 비밀번호와 일치하지 않습니다.')
  //     return
  //   } else {
  //     await instance
  //     .post(
  //       `/users/security`,
  //       {
  //         password
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         withCredentials: true
  //       }
  //     ).then((res) => {
  //       console.log(res.data.message)
  //     })
  //   }
  // }


  const handleCheckPsword = (e) => {
    setPassword(e.target.value)
  }

  // console.log(password)

  const handleCloseEditPasswordModal = (e) => {
    if (e.target === modalEl.current) {
      setEditPswordModal(false)
      document.body.style.overflow = 'unset'
    }
  }

  const hadleEditPasswordPage = () => {
    setEditPswordModal(false)
  }

  useEffect(() => {
    window.addEventListener('click', handleCloseEditPasswordModal)
    return () => {
      window.removeEventListener('click', handleCloseEditPasswordModal)
    }
  })

  return (
    <>
      <GlobalStyle />
      <CheckPasswordContainer>
        <CheckPassword>
          <ModalBackground
            className="modal_background"
            onClick={(e) => handleCloseEditPasswordModal(e)}
            ref={modalEl}
          >
            <CheckPasswordModal>
              <div className="checkPswordTitle">비밀번호 확인</div>
              <input
                type="text"
                className="checkPswordInput"
                placeholder="현재 비밀번호"
                onChange={(e) => handleCheckPsword(e)}
                // onBlur={checkPassword}
                // onBlur={checkPassword}
              ></input>
              <Check>{messagePassword}</Check>
              <div 
              className="checkPswordBtn" 
              onClick={hadleChangePassword}>
                확인하기
              </div>
            </CheckPasswordModal>
          </ModalBackground>
        </CheckPassword>
      </CheckPasswordContainer>
    </>
  )
}

const CheckPasswordContainer = styled.div`
  .modal_background {
    background-color: rgba(31, 29, 29, 0.7);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 400;
  }
`

const CheckPassword = styled.div``

const ModalBackground = styled.div``

const CheckPasswordModal = styled.div`
  width: 500px;
  height: 200px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 500;
  .checkPswordTitle {
    position: absolute;
    top: 40px;
    left: 48px;
    font-size: 1.3rem;
  }
  .checkPswordInput {
    position: absolute;
    width: 400px;
    height: 30px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid black;
    :focus {
      outline: none;
    }
  }
  .checkPswordBtn {
    position: absolute;
    height: 30px;
    bottom: 30px;
    right: 47px;
    font-size: 1.2rem;
    :hover {
      cursor: pointer;
      color: #840909;
    }
  }
`

const Check = styled.div`
  margin: 0;
  margin-top: 0px;
  position: absolute;
  left: 50px;
  bottom: 45px;
  font-size: 13px;
  color: #840909;
`

export default EditPasswordModal