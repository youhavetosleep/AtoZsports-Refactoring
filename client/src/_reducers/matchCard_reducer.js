import { 
  MATCH_DATA, 
  MATCH_LIST_DATA,
  USER_WRITEMATCH,
  USER_FAVORITEMATCH 
} from '../_actions/types'

export default function matchCardReducer (state = {}, action) {
  switch (action.type) {
    case MATCH_DATA:
      return { ...state, matchData: action.payload }
    case MATCH_LIST_DATA:
      return { ...state, matchData: action.payload }
    case USER_WRITEMATCH:
      return { ...state, matchData: action.payload }
    case USER_FAVORITEMATCH:
        return { ...state, matchData: action.payload }
    default:
      return state
  }
}
