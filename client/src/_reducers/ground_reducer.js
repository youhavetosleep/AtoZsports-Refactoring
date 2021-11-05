import { GROUND_DATA,COMMENT_DATA } from '../_actions/types'

export default function groundReducer (state = {}, action) {
  switch (action.type) {
    case GROUND_DATA:
      return { ...state, groundData: action.payload }
      case COMMENT_DATA:
        return { ...state, commentData: action.payload }
    default:
      return state
  }
}
