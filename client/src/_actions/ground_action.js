import { GROUND_DATA, POST_DATA } from './types'
import instance from '../api'

export async function getGroundData() {
  const request = await instance
    .get('/futsal/ground?do=경기&city=용인시', {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((res) => res.data)

  return {
    type: GROUND_DATA,
    payload: request
  }
}

export async function getPostData(postId) {
  const request = await instance
    .get(`/futsal/posts?id=${postId}`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((res) => res.data)

  return {
    type: POST_DATA,
    payload: request
  }
}
