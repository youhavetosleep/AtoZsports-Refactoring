import {LOGIN_USER} from './types'
import instance from '../api'
export async function loginUser(dataToSubmit) {
  const request = await instance
    .post('/signin', dataToSubmit)
    .then((response) => response.data)

  return {
    type: LOGIN_USER,
    payload: request
  }
}
