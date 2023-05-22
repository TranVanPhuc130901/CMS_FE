import {all, takeLatest} from 'redux-saga/effects';
import {getArticle, getCategory, getProduct } from './getSlice';
import { handleGetRequest } from './handlers';


export function* getSaga(){
    yield all([
        takeLatest([getProduct.type, getCategory.type, getArticle.type], handleGetRequest)
    ])
}