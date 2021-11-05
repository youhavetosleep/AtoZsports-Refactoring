import { MATCH_LIST_DATA, POST_DATA } from './types'
import instance from '../api'

export async function getMatchListData(
  offset,
  startTime,
  endTime,
  CurrentOrder,
  date,
  region1,
  region2
) {
  const request = await instance
    .get(
      `/futsal/posts?date=${date}&startTime=${startTime}&endTime=${endTime}&&division=${CurrentOrder}&do=${region1}&city=${region2}&offset=${offset}&limit=6`,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
    .then((response) => response.data)
    .catch((err) => console.log(err))

  return {
    type: MATCH_LIST_DATA,
    payload: request
  }
}

export async function sortedMatchListData(
  offset,
  startTime,
  endTime,
  CurrentOrder,
  date,
  region1,
  region2
) {
  const request = await instance
    .get(
      `/futsal/posts?date=${date}&startTime=${startTime}&endTime=${endTime}&&division=${CurrentOrder}&do=${region1}&city=${region2}&offset=${offset}&limit=6`,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
    .then((response) => response.data)
    .catch((err) => console.log(err))

  return {
    type: MATCH_LIST_DATA,
    payload: request
  }
}

export async function getPostData(postId, token) {
  const request = await instance
    .get(`/futsal/posts?id=${postId}`, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    .then((res) => res.data)
    .catch((err) => console.log(err))

  return {
    type: POST_DATA,
    payload: request
  }
}

export async function deletePostData(postId, token) {
  const request = await instance
    .delete(`/futsal/posts/${postId}`, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    .then((res) => res.data)
    .catch((err) => console.log(err))

  return {
    type: POST_DATA,
    payload: request
  }
}

export async function editPostData(postId, token) {
  const request = await instance
    .patch(`/futsal/posts?id=${postId}`, {}, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    .then((res) => res.data)
    .catch((err) => console.log(err))

  return {
    type: POST_DATA,
    payload: request
  }
}

export async function changeStatusData(postId, token, status) {
  console.log(postId, token, status)
  const request = await instance
    .patch(`/futsal/posts/${postId}/status`, {
      status
    }, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    .then((res) => res.data)
    .catch((err) => console.log(err))

  return {
    type: POST_DATA,
    payload: request
  }
}
