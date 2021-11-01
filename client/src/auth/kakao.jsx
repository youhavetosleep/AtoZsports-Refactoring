import React, { useEffect } from 'react'
import dotenv from 'dotenv'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { kakaoUser } from '../_actions/user.action'


dotenv.config()

const CLIENTDOMAIN =
  process.env.REACT_APP_CLIENT_DOMAIN || 'http://localhost:3000'
const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID
const REDIRECT_URI = `${CLIENTDOMAIN}/kakao`

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

const Kakao = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const kakaoLogin = async (authorizationCode) => {
    dispatch(kakaoUser(authorizationCode))
    if(authorizationCode) {
      Swal.fire({
        title: '회원가입이 완료되었습니다!',
        icon: 'success',
        confirmButtonColor: '#d6d6d6',
        confirmButtonText: '확인'
      })
      history.push('/')
    }
  }

  useEffect(() => {
    let authorizationCode = new URL(window.location.href).searchParams.get('code')
    kakaoLogin(authorizationCode)
  }, [])

  return <h1>카카오 인증페이지입니다</h1>
}

export default Kakao
