import { call, put } from 'redux-saga/effects';



import { requestGetProduct, requestGetCategory, requestGetArticle, requestGetUser } from './request';
import { setGetProduct, setGetCategory, setGetArticle, setGetUser } from './getSlice'; 
import { useSelector } from 'react-redux';

export function* handleGetRequest(action : any):Generator<any>
{        
    try {
        // gọi api từ request bằng cách gọi và truyền tên query
        const reponseProduct = yield call(requestGetProduct);
        const reponseCategory = yield call(requestGetCategory);
        const reponseArticle = yield call(requestGetArticle);
        const reponseUser = yield call(requestGetUser);

        // gán giá trị gọi được từ api vào 1 biến

        const products = reponseProduct;
        const categories = reponseCategory;
        const article = reponseArticle;
        const user = reponseUser;

        // thêm giá trị api vào store bằng put trong redux-saga
        yield put (setGetProduct(products));
        yield put (setGetCategory(categories));
        yield put (setGetArticle(article));
        yield put (setGetUser(user));        

    } catch (error) {
        console.log(error);
    }
}