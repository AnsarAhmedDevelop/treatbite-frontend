import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    accessToken: null,
  }
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
         updateUser: (state, action) => {
            // Only update the specified fields
            state.user = {
                ...state.user,
                ...action.payload,
            };
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setLogout: (state) => {
            return initialState; // Reset the state to its initial values
        },
    },
});

export const { setUser, setAccessToken, setLogout, updateUser } = userSlice.actions;
export default userSlice.reducer;