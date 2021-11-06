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
        // 인증이 성공한 경우
        if (res.status === 200) {
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
      .catch((err) => {
        // 인증이 만료된 경우
        if (err.response.status === 409) {
          Swal.fire({
            title: '인증이 만료되었습니다',
            icon: 'warning',
            allowOutsideClick: false,
            confirmButtonColor: '#d2d2d2',
            confirmButtonText: '메일 재전송'
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              await instance
                .patch(
                  `/users/re-auth`,
                  { email },
                  {
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    withCredentials: true
                  }
                )
                history.push('/')
            }
          })
        }
      })
  }

  useEffect(() => {
    authEmail()
  }, [])

  return <h1></h1>
}

export default Auth
