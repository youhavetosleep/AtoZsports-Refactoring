import { LOGIN_USER, LOGOUT_USER, KAKAO_USER, GOOGLE_USER } from '../_actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload }
    case LOGOUT_USER:
      return (state = {})
    case KAKAO_USER:
      return { ...state, loginSuccess: action.payload }
    case GOOGLE_USER:
      return { ...state, loginSuccess: action.payload }
    default:
      return state
  }
}
