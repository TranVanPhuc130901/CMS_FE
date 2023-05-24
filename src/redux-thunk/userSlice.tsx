import { requestLogin } from '@/sagas/User/request';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface LoginData {
    userName: string,
    password: string
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
      fullName: '',
      token: '',
      isLoading: false,
      error: null,
    },
    reducers: {
        setFullName: (state, action) => ({
            ...state,
            fullName: action.payload
        }),
        getFullName(){},
        setToken: (state, action) => ({
          ...state,
          token: action.payload
      }),
      getToken(){},
    },
  });

  export const {setFullName, getFullName, setToken, getToken} = userSlice.actions
export default userSlice.reducer;