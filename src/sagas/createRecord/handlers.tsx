import { call, put, takeEvery } from 'redux-saga/effects';

import { addProduct, addArticleSuccess, addArticleFailure } from './createRecordSlice';
import { requestAddProduct } from './request';


export function* handleAddProduct(action: any):Generator<any>{
    try {
        const {formData} = action.payload;

        yield call(requestAddProduct, formData);

        yield put(addArticleSuccess());
    } catch (error: any) {
        yield put(addArticleFailure(error.message));
    }
}