import { 
  MATCH_LIST_DATA,
  POST_DATA,
  POST_WRITE
} from '../_actions/types'

export default function postReducer (state = {}, action) {
  switch (action.type) {
    case MATCH_LIST_DATA:
      return { ...state, postData: action.payload }
    case POST_DATA:
        return { ...state, postData: action.payload }
    case POST_WRITE:
        return { ...state, postData: action.payload }
    default:
      return state
  }
}