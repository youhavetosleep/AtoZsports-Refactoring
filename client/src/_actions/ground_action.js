import { GROUND_DATA } from './types'
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
