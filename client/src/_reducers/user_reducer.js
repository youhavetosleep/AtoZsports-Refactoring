import {
  LOGIN_USER,
  LOGOUT_USER,
  KAKAO_USER,
  GOOGLE_USER,
  DELETE_USER,
  MYPAGE_USER,
  USER_PASSWORD,
  USER_PASSWORDCHECK,
  SPORT_DATA
} from '../_actions/types'

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload }
    case LOGOUT_USER:
      return (state = {})
    case MYPAGE_USER:
      return { ...state, loginSuccess: action.payload }
    case KAKAO_USER:
      return { ...state, loginSuccess: action.payload }
    case GOOGLE_USER:
      return { ...state, loginSuccess: action.payload }
    case DELETE_USER:
      return (state = {})
    case USER_PASSWORD:
      return { ...state, passwordSuccess: action.payload }
    case USER_PASSWORDCHECK:
      return { ...state, passwordSuccess: action.payload }
    case SPORT_DATA:
      return { ...state, sport: action.payload }
    default:
      return state
  }
}
