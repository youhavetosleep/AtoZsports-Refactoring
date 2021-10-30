import axios from 'axios'
import { MATCH_DATA } from './types'

// 용병, 경기제안 데이터

export async function getMatchData() {
  const request = await axios
    .get(`http://localhost:80/futsal?division=member&do=경기&city=용인시`,{
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true 
    })
    .then(res => res.data)

  return {
    type: MATCH_DATA,
    payload: request
  }
}