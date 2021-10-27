import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { loginUser } from '../_actions/user.action'
import login1 from '../image/login1.png'
import googleLogo from '../image/googleLogo.jpg'
import kakaoLogo from '../image/kakaoLogo.png'
import Swal from 'sweetalert2'

const LoginModal = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  //로그인 데이터
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //로그인 버튼
  const logIn = async () => {
    let userData = {
      email, password
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
      .then(res => {
        console.log(res.payload)
      }).catch(err => {
        if(err.response.status === 409) {
          Swal.fire({
            text: '이메일인증을 진행해주세요',
            icon: 'warning',
            confirmButtonColor: '#d2d2d2',
            confirmButtonText: '확인'
          })
        }else if(err.response.status === 404) {
          Swal.fire({
            text: '사용자를 찾을 수 없습니다',
            icon: 'warning',
            confirmButtonColor: '#d2d2d2',
            confirmButtonText: '확인'
          })
        }                
      })
    }
  }

  return (
    <Container>
      <Form>
        <LoginImg src={login1} />
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
            <SignupBtn onClick={() => history.push('/signup')}>
              회원가입
            </SignupBtn>
          </SignUpWrap>
          <LineWrap>
            <Or>or</Or>
            <Line />
          </LineWrap>
          <GoogleWrap>
            <SocialLogo src={googleLogo} />
            <SocialText>google 계정으로 로그인</SocialText>
          </GoogleWrap>
          <KakaoWrap>
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
  background: rgba(0, 0, 0, 0.6);
  background-color: #797979;
  animation: back 0.5s ease-in;
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
  display: flex;
`

const LoginImg = styled.img`
  width: 50%;
  height: 100%;
`

const LoginWrap = styled.div`
  width: 50%;
  height: 100%;
  padding: 50px 50px;
  box-sizing: border-box;
`

const Title = styled.h1`
  text-align: right;
  font-size: 40px;
  margin-bottom: 70px;
  font-weight : bold;
  color : #505050;
`
const Input = styled.input`
  border: none;
  border-bottom: solid 2px #e4e4e4;
  width: 97%;
  padding: 3px;
  margin-bottom: 20px;
  :focus {
    outline: none;
    border-bottom: solid 3.5px #797979;
    ::placeholder {
      color: #e4e4e4;
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
`
const KakaoWrap = styled.div`
  position: relative;
  border: none;
  height: 35px;
  border-radius: 20px;
  padding: 13px 60px 10px 20px;
  box-sizing: border-box;
  background-color: #ffdc00;
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
