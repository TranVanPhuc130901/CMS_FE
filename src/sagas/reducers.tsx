import { combineReducers } from 'redux';
import getSlice from './getRecord/getSlice';
import createRecordSlice from './createRecord/createRecordSlice';

const reducer = combineReducers({
    getRecord: getSlice,
    addRecord: createRecordSlice
})

export default reducer;