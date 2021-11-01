import { LOGIN_USER, KAKAO_USER, GOOGLE_USER, LOGOUT_USER } from './types'
import instance from '../api'
import axios from 'axios'

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
        id,
        email,
        nickname,
        userPhone,
        homeground,
        createdAt,
        favoriteSports
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
    .then((res) => console.log(res.data))

  return {
    type: LOGOUT_USER,
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
