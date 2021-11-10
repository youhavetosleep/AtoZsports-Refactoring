import {
  LOGIN_USER,
  KAKAO_USER,
  GOOGLE_USER,
  LOGOUT_USER,
  DELETE_USER,
  MYPAGE_USER,
  USER_PASSWORD,
  USER_PASSWORDCHECK,
  SPORT_DATA
} from './types'
import instance from '../api'

export async function loginUser(dataToSubmit) {
  const request = await instance
    .post('/users/signin', dataToSubmit, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((response) => {
      instance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.accessToken}`
      const {
        id,
        email,
        nickname,
        userPhone,
        homeground,
        createdAt,
        favoriteSports
      } = response.data.userData
      return {
        accessToken: response.data.accessToken,
        userData: {
          id,
          email,
          nickname,
          userPhone,
          homeground,
          createdAt,
          favoriteSports
        }
      }
    })

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export async function logoutUser() {
  const request = await instance
    .post(`/users/logout`)
    .then((res) => res.data.message)

  return {
    type: LOGOUT_USER,
    payload: request
  }
}

export async function mypageUser(changeUserInfo, Token, region1, region2) {
  const request = await instance
    .patch(
      '/users',
      {
        email: changeUserInfo.email,
        nickname: changeUserInfo.nickname,
        userPhone: changeUserInfo.userPhone,
        homeground: `${region1} ${region2}`,
        favoriteSports: changeUserInfo.favoriteSports,
        userId: changeUserInfo.userId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        },
        withCredentials: true
      }
    )
    .then((res) => res.data)

  return {
    type: MYPAGE_USER,
    payload: request
  }
}

export async function kakaoUser(authorizationCode) {
  const request = await instance
    .get(`/users/signin/kakao?code=${authorizationCode}`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((response) => response.data)
    .catch((err) => console.log(err))

  return {
    type: KAKAO_USER,
    payload: request
  }
}

export async function googleUser(authorizationCode) {
  const request = await instance
    .get(`/users/signin/google?code=${authorizationCode}`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((response) => response.data)
    .catch((err) => console.log(err))

  return {
    type: GOOGLE_USER,
    payload: request
  }
}

export async function deleteUser(Token) {
  const request = await instance
    .delete(`/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`
      },
      withCredentials: true
    })
    .then((res) => res.data.message)

  return {
    type: DELETE_USER,
    payload: request
  }
}

export async function userPassword(password, token) {
  const request = await instance
    .post(
      `/users/security`,
      {
        password
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    )
    .then((res) => res.data.message)
    .catch((res) => '비밀번호가 일치하지 않습니다!')

  return {
    type: USER_PASSWORD,
    payload: request
  }
}

export async function userChangePsword(secondPsword, Token) {
  const request = await instance
    .patch(
      `/users/security`,
      {
        password: secondPsword
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        },
        withCredentials: true
      }
    )
    .then((res) => res.data)
    .catch((err) => err)

  return {
    type: USER_PASSWORDCHECK,
    payload: request
  }
}

export async function authMailResend(email) {
  await instance
    .patch(
      `/users/re-auth`,
      {
        email
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    )
    .then((res) => console.log(res))
}

export async function selectedSport(data) {
  const info = data

  return {
    type: SPORT_DATA,
    payload: info
  }
}
