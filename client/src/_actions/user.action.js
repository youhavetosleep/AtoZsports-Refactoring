import { LOGIN_USER, KAKAO_USER, GOOGLE_USER } from './types'
import instance from '../api'

export async function loginUser(dataToSubmit) {
  const request = await instance
    .post('/users/signin', dataToSubmit, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((response) => {
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
    .catch((err) => {
      console.log(err)
    })

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export async function kakaoUser(authorizationCode) {
  const request = await instance
<<<<<<< HEAD
    .get(`/users/signin/kakao?code=${authorizationCode}`, {
=======
    .get(`users/signin/kakao?code=${authorizationCode}`, {
>>>>>>> 2602ec50be64fc7dcead5899f0b20cc0d0fbc851
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((response) => response.data)

  return {
    type: KAKAO_USER,
    payload: request
  }
}

export async function googleUser(authorizationCode) {
  const request = await instance
<<<<<<< HEAD
    .get(`/users/signin/google?code=${authorizationCode}`, {
=======
    .get(`users/signin/google?code=${authorizationCode}`, {
>>>>>>> 2602ec50be64fc7dcead5899f0b20cc0d0fbc851
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((response) => response.data)

  return {
    type: GOOGLE_USER,
    payload: request
  }
}
