import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error:null,
    loading: false
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.error = null;
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.error = null;
            state.loading = false;
            state.currentUser = action.payload;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;