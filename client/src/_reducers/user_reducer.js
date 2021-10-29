import { LOGIN_USER, KAKAO_USER, GOOGLE_USER } from '../_actions/types'

export default function userReducer (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload }
    case KAKAO_USER:
      return { ...state, loginSuccess: action.payload }
    case GOOGLE_USER:
      return { ...state, loginSuccess: action.payload }
    default:
      return state
  }
}
