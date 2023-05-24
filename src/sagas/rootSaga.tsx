import { all, fork } from 'redux-saga/effects'
import { getSaga } from './getRecord/getSaga'


export function* rootSaga(){
    yield all([fork(getSaga)])
}