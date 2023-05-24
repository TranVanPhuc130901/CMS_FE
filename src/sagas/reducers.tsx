import { combineReducers } from 'redux';
import getSlice from './getRecord/getSlice';
import userSliceReducer from '@/redux-thunk/userSlice';

const reducer = combineReducers({
    getRecord: getSlice,
    userLogin: userSliceReducer,
})

export default reducer;