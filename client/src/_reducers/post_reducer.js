import { 
  MATCH_LIST_DATA,
  POST_DATA
} from '../_actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case MATCH_LIST_DATA:
      return { ...state, postData: action.payload }
      case POST_DATA:
        return { ...state, postData: action.payload }
    default:
      return state
  }
}