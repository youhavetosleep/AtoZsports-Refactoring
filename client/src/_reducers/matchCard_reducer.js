import { MATCH_DATA } from '../_actions/types'

export default function (state={}, action) {
    switch(action.type) {
        case MATCH_DATA:
            return {...state, matchData: action.payload}
        default:
            return state       
    }
}