import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import user from './user_reducer'
import matchCard from './matchCard_reducer'
import ground from './ground_reducer'

const persistConfig = {
  key: 'root',
  // localStoreag에 저장
  storage
}

const rootReducer = combineReducers({
  user,
  matchCard,
  ground
})

export default persistReducer(persistConfig, rootReducer)
