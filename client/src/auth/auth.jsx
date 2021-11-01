import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'
import instance from '../api/index'

const Auth = () => {
  const history = useHistory()

  let verifiedKey = new URL(window.location.href).searchParams.get('verifiedKey')
  let email = new URL(window.location.href).searchParams.get('email')

  const authEmail = async () => {
    await instance
      .patch(
        '/users',
        {
          email,
          verifiedKey
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      .then((res) => {
        if (res.data.message) {
          Swal.fire({
            title: '회원가입이 완료되었습니다!',
            icon: 'success',
            text: '로그인 후 서비스를 이용해보세요',
            confirmButtonColor: '#d6d6d6',
            confirmButtonText: '확인'
          })
          history.push('/')
        }
      })
  }

  useEffect(() => {
    authEmail()
  }, [])

  return <h1>인증페이지입니다. </h1>
}

export default Auth
