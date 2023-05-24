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
      isLoading: false,
      error: null,
    },
    reducers: {
        setFullName: (state, action) => ({
            ...state,
            fullName: action.payload
        }),
        getFullName(){},
    },
  });

  export const {setFullName, getFullName} = userSlice.actions
export default userSlice.reducer;