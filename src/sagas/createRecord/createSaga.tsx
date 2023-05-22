

import {takeEvery} from 'redux-saga/effects'
import { addProduct } from './createRecordSlice'
import { handleAddProduct } from './handlers'

export function* watchAddProduct(){
    yield takeEvery(addProduct.type, handleAddProduct);
}