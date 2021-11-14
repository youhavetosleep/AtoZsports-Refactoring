import {
  GROUND_DATA,
  COMMENT_DATA,
  MAP_DATA,
  ACCORD_DATA
} from '../_actions/types'

export default function groundReducer(state = {}, action) {
  switch (action.type) {
    case GROUND_DATA:
      return { ...state, groundData: action.payload }
    case COMMENT_DATA:
      return { ...state, commentData: action.payload }
    case MAP_DATA:
      return { ...state, mapData: action.payload }
    case ACCORD_DATA:
      return { ...state, accordData: action.payload }
    default:
      return state
  }
}
