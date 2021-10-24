import axios from 'axios'

export async function loginUser(dataToSubmit) {
  const request = await axios
    .post('/users/signin', dataToSubmit)
    .then((response) => response.data)

  return {
    type: 'LOGIN_USER',
    payload: request
  }
}
