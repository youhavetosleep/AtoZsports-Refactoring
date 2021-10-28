import axios from 'axios'
import { MATCH_LIST } from './types'

export async function getMatchList() {
  const request = await axios
    .post('/{sports}?do={do}&city={city}')
    .then((response) => response.data)

  return {
    type: MATCH_LIST,
    payload: request
  }
}