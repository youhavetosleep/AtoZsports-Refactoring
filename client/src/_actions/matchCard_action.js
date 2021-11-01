import axios from 'axios'
import { MATCH_DATA, MATCH_LIST_DATA } from './types'
import instance from '../api'
// 용병, 경기제안 데이터

export async function getMatchData() {
  const request = await axios
    .get(`http://localhost:80/futsal?division=member&do=경기&city=용인시`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    .then((res) => res.data)

  return {
    type: MATCH_DATA,
    payload: request
  }
}

export async function getMatchListData(offset, CurrentOrder, date) {
  const request = await instance
    .get(
      `/futsal/posts?date=${date}&division=${CurrentOrder}&do=경기&city=용인시&offset=${offset}&limit=1`,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
    .then((response) => response.data)
    .catch(err => console.log(err))

  return {
    type: MATCH_LIST_DATA,
    payload: request
  }
}

export async function sortedMatchListData(offset, startTime, endTime, CurrentOrder, date, region1, region2) {
  console.log(offset, startTime, endTime, CurrentOrder, date, region1, region2)
  const request = await instance
    .get(
      `/futsal/posts?date=${date}&startTime=${startTime}&endTime=${endTime}&&division=${CurrentOrder}&do=${region1}&city=${region2}&offset=${offset}&limit=2`,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
    .then((response) => response.data)
    .catch(err => console.log(err))

  return {
    type: MATCH_LIST_DATA,
    payload: request
  }
}