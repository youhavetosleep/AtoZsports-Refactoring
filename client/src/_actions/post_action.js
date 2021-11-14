import { MATCH_LIST_DATA, POST_DATA, POST_WRITE } from './types'
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
      `/futsal/posts/list?date=${date}&startTime=${startTime}&endTime=${endTime}&&division=${CurrentOrder}&do=${region1}&city=${region2}&offset=${offset}&limit=6`,
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
      `/futsal/posts/list?date=${date}&startTime=${startTime}&endTime=${endTime}&&division=${CurrentOrder}&do=${region1}&city=${region2}&offset=${offset}&limit=6`,
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

export async function writePostData(
  postTitle,
  postDivision,
  startDate,
  postStartTime,
  postEndTime,
  sports,
  postContent,
  groundData,
  postPhoneOpen,
  Token
) {
  const request = await instance
    .post(
      `/futsal/posts`,
      {
        sports: sports,
        title: postTitle,
        division: postDivision,
        startTime: `${startDate} ${postStartTime}`,
        endTime: `${startDate} ${postEndTime}`,
        phoneOpen: postPhoneOpen,
        content: postContent,
        ground: groundData
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
    .catch((err) => console.log(err))

  return {
    type: POST_WRITE,
    payload: request
  }
}

export async function editPostData(
  postTitle,
  postDivision,
  startDate,
  postStartTime,
  postEndTime,
  postStatus,
  postContent,
  groundData,
  postPhoneOpen,
  userId,
  Token
) {
  const request = await instance
    .patch(
      `/futsal/posts/${userId}`,
      {
        status: postStatus,
        title: postTitle,
        division: postDivision,
        startTime: `${startDate} ${postStartTime}`,
        endTime: `${startDate} ${postEndTime}`,
        content: postContent,
        ground: groundData,
        phoneOpen: postPhoneOpen
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        },
        withCredentials: true
      }
    )
    .then((res) => res.data.postsData)
    .catch((err) => console.log(err))

  return {
    type: POST_DATA,
    payload: request
  }
}

export async function changeStatusData(postId, token, status) {
  const request = await instance
    .patch(
      `/futsal/posts/${postId}/status`,
      {
        status
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err))

  return {
    type: POST_DATA,
    payload: request
  }
}
