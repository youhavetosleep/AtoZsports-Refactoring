import React, { useEffect } from 'react'
import dotenv from 'dotenv'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { googleUser } from '../_actions/user_action'
dotenv.config()

const CLIENTDOMAIN =
  process.env.REACT_APP_CLIENT_DOMAIN || 'http://localhost:3000'
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
const REDIRECT_URI = `${CLIENTDOMAIN}/google`

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`

const Google = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const googleLogin = async (authorizationCode) => {
    dispatch(googleUser(authorizationCode)).then(res=>{
      window.location.reload()
    })
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
    let hash = new URL(window.location.href).hash
    let authorizationCode = hash.split('=')[1].split('&')[0]
    googleLogin(authorizationCode)
  }, [])

  return <h1>구글 인증페이지입니다</h1>
}

export default Google
