import {GROUND_DATA} from '../_actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case GROUND_DATA:
      return { ...state, groundData: action.payload }
    default:
      return state
  }
}