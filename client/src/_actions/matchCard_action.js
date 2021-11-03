import axios from 'axios'
import {
  MATCH_DATA,
  MATCH_LIST_DATA,
  USER_WRITEMATCH,
  USER_FAVORITEMATCH
} from './types'
import instance from '../api'

// 용병, 경기제안 데이터
export async function getMatchData(CurrentOrder) {
  const request = await instance
    .get(`/futsal?division=${CurrentOrder}&do=경기&city=용인시`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((res) => res.data)

  return {
    type: MATCH_DATA,
    payload: request
  }
}

export async function getUserMatchData(Token) {
  const request = await instance
    .get(`/users/mypost`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`
      },
      withCredentials: true
    })
<<<<<<< HEAD
    .then((res) => res.data.postList)
=======
    .then((res) => res)
>>>>>>> ca5d326881b102d5ef0ac02b646096c791f8ede7
    .catch((err) => console.log(err))

  return {
    type: USER_WRITEMATCH,
    payload: request
  }
}

export async function getUserFavoriteData(Token) {
  const request = await instance
    .get(`/users/favorite`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`
      },
      withCredentials: true
    })
<<<<<<< HEAD
    .then((res) => res.data)
=======
    .then((res) => res)
>>>>>>> ca5d326881b102d5ef0ac02b646096c791f8ede7
    .catch((err) => console.log(err))

  return {
    type: USER_FAVORITEMATCH,
    payload: request
  }
}
