import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

import { loginUser, authMailResend } from '../_actions/user_action'
import login1 from '../image/login1.png'
import googleLogo from '../image/googleLogo.jpg'
import kakaoLogo from '../image/kakaoLogo.png'
import { KAKAO_AUTH_URL } from '../auth/kakao.jsx'
import { GOOGLE_AUTH_URL } from '../auth/google.jsx'

const LoginModal = ({ setLoginOpen }) => {
  const _modal = useRef()
  const history = useHistory()
  const dispatch = useDispatch()

  const handleCloseModal = (e) => {
    if (e.target === _modal.current) {
      setLoginOpen(false)
      document.body.style.overflow = 'unset'
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleCloseModal)
    return () => {
      window.removeEventListener('click', handleCloseModal)
    }
  })

  //로그인 데이터
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //로그인 버튼
  const logIn = async () => {
    let userData = {
      email,
      password
    }

    if (email === '' || password === '') {
      Swal.fire({
        text: '이메일과 비밀번호를 모두 입력해주세요!',
        icon: 'warning',
        confirmButtonColor: '#d2d2d2',
        confirmButtonText: '확인'
      })
      return
    } else {
      dispatch(loginUser(userData))
        .then((res) => {
          setLoginOpen(false)
          window.location.reload()
        })
        .catch((err) => {
          if (err.response.status === 409) {
            Swal.fire({
              text: '이메일인증을 진행해주세요',
              icon: 'warning',
              showCancelButton: true,
              cancelButtonText: '확인',
              confirmButtonColor: '#8F2929',
              confirmButtonText: '메일 재전송'
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(authMailResend(email))
                Swal.fire({
                  text: '인증 메일이 전송되었습니다.',
                  confirmButtonColor: '#d2d2d2',
                  confirmButtonText: '확인'
                })
              }
            })
          } else if (err.response.status === 404) {
            Swal.fire({
              title: '사용자를 찾을 수 없습니다',
              text: '이메일과 비밀번호를 확인해주세요',
              icon: 'warning',
              confirmButtonColor: '#d2d2d2',
              confirmButtonText: '확인'
            })
          }
        })
    }
  }

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }

  const googleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL
  }

  return (
    <Container onClick={(e) => handleCloseModal(e)} ref={_modal}>
      <Form>
        <LoginImg className="img" src={login1} />
        <LoginWrap>
          <Title>Login</Title>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                logIn(event)
              }
            }}
          />
          <LoginBtn onClick={logIn}>로그인</LoginBtn>
          <SignUpWrap>
            <SignupText>아직 회원이 아니신가요?</SignupText>
            <SignupBtn
              onClick={() => {
                setLoginOpen(false)
                history.push('/signup')
              }}
            >
              회원가입
            </SignupBtn>
          </SignUpWrap>
          <LineWrap>
            <Or>or</Or>
            <Line />
          </LineWrap>
          <GoogleWrap onClick={googleLogin}>
            <SocialLogo src={googleLogo} />
            <SocialText>google 계정으로 로그인</SocialText>
          </GoogleWrap>
          <KakaoWrap onClick={kakaoLogin}>
            <SocialLogo src={kakaoLogo} />
            <SocialText>kakao 계정으로 로그인</SocialText>
          </KakaoWrap>
        </LoginWrap>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 400;
  background-color: rgba(0, 0, 0, 0.6);
  animation: back 0.1s ease-in;
  @keyframes back {
    from {
      opacity: 0%;
    }
    to {
      opacity: 80%;
    }
  }
`

const Form = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: #ffffff;
  transform: translate(-50%, -50%);
  width: 720px;
  height: 500px;
  border-radius : 5px;
  display: flex;
  z-index: 500;
  @media screen and (max-width: 767px) {
    width: 355px;
    transform: translate(-50%, -50%);
  }
`

const LoginImg = styled.img`
  width: 50%;
  height: 100%;
  border-radius : 5px 0 0 5px;
  @media screen and (max-width: 767px) {
    width: 0;
    height: 0;
  }
`

const LoginWrap = styled.div`
  width: 50%;
  height: 100%;
  padding: 55px 50px 50px 50px;
  box-sizing: border-box;
  position: relative;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

const Title = styled.h1`
  text-align: right;
  font-size: 40px;
  margin-bottom: 70px;
  font-weight: bold;
  color: #505050;
`

const Input = styled.input`
  border: none;
  border-bottom: solid 2px #e4e4e4;
  width: 97%;
  padding: 3px;
  margin-bottom: 20px;
  ::placeholder {
    color: #cecece;
  }
  :focus {
    outline: none;
    border-bottom: solid 2px #797979;
    ::placeholder {
      color: #797979;
    }
  }
`

const LoginBtn = styled.button`
  border: solid 1px #666666;
  width: 100%;
  padding: 7px;
  color: #292929;
  background-color: #ffffff;
  font-size: 15px;
  border-radius: 20px;
  :hover {
    cursor: pointer;
  }
`

const SignUpWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

const SignupText = styled.p`
  text-align: right;
  font-size: 13px;
  text-align: center;
  align-items: center;
  margin: auto 0;
  color: #a5a5a5;
`

const SignupBtn = styled.button`
  border: none;
  background-color: #ffffff;
  font-size: 14px;
  color: #707070;
  :hover {
    color: #393939;
    cursor: pointer;
  }
`

const LineWrap = styled.div`
  position: relative;
  height: 50px;
`

const Or = styled.h3`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 20px;
  background-color: #ffffff;
  color: #e4e4e4;
  transform: translate(-50%, -35%);
  z-index: 2;
  text-align: center;
`

const Line = styled.div`
  position: absolute;
  border: solid 0.1px #e4e4e4;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`

const GoogleWrap = styled.div`
  position: relative;
  border: solid 1px #bebebe;
  height: 35px;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 12px 60px 10px 20px;
  box-sizing: border-box;
  :hover {
    cursor: pointer;
  }
`

const KakaoWrap = styled.div`
  position: relative;
  border: none;
  height: 35px;
  border-radius: 20px;
  padding: 13px 60px 10px 20px;
  box-sizing: border-box;
  background-color: #ffdc00;
  :hover {
    cursor: pointer;
  }
`

const SocialLogo = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(110%, 35%);
`

const SocialText = styled.p`
  margin: 0;
  font-size: 13px;
  text-align: right;
`

export default LoginModal
