import { createSlice } from '@reduxjs/toolkit';

const getSlice = createSlice({
    name: 'get',
    initialState: {
        products: [],
        categories: [],
        article: [],
        user: [],
        loading: true,
    },
    reducers: {
        setGetProduct: (state, action) => ({
            ...state,
            products: action.payload,
        }),
        getProduct(

        ){},
        setGetCategory: (state, action) => ({
            ...state,
            categories: action.payload
        }),
        getCategory(){},
        setGetArticle: (state, action) => ({
            ...state,
            article: action.payload
        }),
        getArticle(){},
        setGetUser: (state, action) => ({
            ...state,
            user: action.payload
        }),
        getUser(){},
        setLoading: (state, action) => ({
            ...state,
            loading: action.payload
        })
    }
})

export const {setGetProduct, getProduct, setGetCategory, getCategory, setGetArticle, getArticle, setGetUser, getUser, setLoading } = getSlice.actions;
export default getSlice.reducer;
