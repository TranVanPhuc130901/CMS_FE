import { createSlice } from '@reduxjs/toolkit';

const createRecordSlice = createSlice({
    name: 'create',
    initialState: {
        isAdding: false,
        error: null,
        loading: true
    },
    reducers: {
        addProduct: (state, action) => {
            state.isAdding = true,
            state.error = null
        },
        addProductSuccess: (state, action) => {
            state.isAdding = false
        },
        addProductFailure: (state, action) => {
            state.isAdding = false,
            state.error = action.payload
        },
        addArticle: (state) => {
            state.isAdding = true;
            state.error = null;
          },
          addArticleSuccess: (state) => {
            state.isAdding = false;
          },
          addArticleFailure: (state, action) => {
            state.isAdding = false;
            state.error = action.payload;
          },
    }
});

export const { addProduct, addProductSuccess, addProductFailure, addArticle, addArticleSuccess, addArticleFailure} = createRecordSlice.actions;

export default createRecordSlice.reducer;