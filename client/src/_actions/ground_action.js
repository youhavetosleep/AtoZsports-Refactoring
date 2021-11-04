import { GROUND_DATA, COMMENT_DATA } from './types'
import instance from '../api'

export async function getGroundData(region1, region2) {
  const request = await instance
    .get(`/futsal/ground?do=${region1}&city=${region2}`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((res) => res.data)

  return {
    type: GROUND_DATA,
    payload: request
  }
}

export async function selectGroundData(groundId, token) {
  const request = await instance
    .get(`/futsal/ground?id=${groundId}`, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    .then((res) => res.data)

  return {
    type: GROUND_DATA,
    payload: request
  }
}


export async function getCommentData(groundId, offset) {
  const request = await instance
  .get(`/futsal/ground/${groundId}/review?offset=${offset}&limit=5`, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  .then((res) => res.data )
  .catch((err) => console.log(err))

  return {
    type: COMMENT_DATA,
    payload: request
  }
}

export async function addCommentData(groundId, token, score, userId, comment) {
  console.log(groundId, token, score, userId, comment)
  const request = await instance
  .post(`/futsal/ground/${groundId}/review`,{
    userId,
    comment,
    score
  } ,{
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })
  .then((res) => res.data )
  .catch((err) => console.log(err))

  return {
    type: COMMENT_DATA,
    payload: request
  }
}

export async function updateCommentData(groundId, commentId, token, comment, score) {
  console.log(groundId, commentId, token, comment, score)
  const request = await instance
  .patch(`/futsal/ground/${groundId}/review/${commentId}`,{
    comment,
    score
  } ,{
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })
  .then((res) => res.data )
  .catch((err) => console.log(err))

  return {
    type: COMMENT_DATA,
    payload: request
  }
}

export async function deleteCommentData(groundId, commentId, token) {
  const request = await instance
  .delete(`/futsal/ground/${groundId}/review/${commentId}`, {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })
  .then((res) => res.data )
  .catch((err) => console.log(err))

  return {
    type: COMMENT_DATA,
    payload: request
  }
}