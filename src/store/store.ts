import { combineReducers, createStore } from 'redux';
import {mainReducer} from './reducers/mainReducer'

const rootReducer = combineReducers({
    mainReducer })

export type RootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)
