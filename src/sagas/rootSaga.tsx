import { all, fork } from 'redux-saga/effects'
import { getSaga } from './getRecord/getSaga'
import { watchAddProduct } from './createRecord/createSaga'


export function* rootSaga(){
    yield all([fork(getSaga), fork(watchAddProduct)])
}