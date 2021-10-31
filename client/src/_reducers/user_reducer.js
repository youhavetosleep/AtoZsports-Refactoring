import { 
  LOGIN_USER, 
  LOGOUT_USER, 
  KAKAO_USER, 
  GOOGLE_USER,
  DELETE_USER } from '../_actions/types'

export default function userReducer (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload }
    case LOGOUT_USER:
      return (state = {})
    case KAKAO_USER:
      return { ...state, loginSuccess: action.payload }
    case GOOGLE_USER:
      return { ...state, loginSuccess: action.payload }
    case DELETE_USER:
      return (state = {});
    default:
      return state
  }
}
