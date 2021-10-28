import { MATCH_LIST } from '../_actions/types'

export default function (state={}, action) {
    switch(action.type) {
        case MATCH_LIST:
            return {...state, matchCard: action.payload }
        default:
            return state       
    }
}