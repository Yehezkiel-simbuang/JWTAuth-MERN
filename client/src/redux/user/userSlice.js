import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isLoading: false,
        error: false,
        updateLoading: false,
        updateError: false,
    },
    reducers: {
        signInStart: (state) => {
            state.isLoading = true;
        },
        signInSuccess: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        signInFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        signUpStart: (state) => {
            state.isLoading = true;
        },
        signUpSuccess: (state) => {
            state.isLoading = false;
            state.error = false;
        },
        signUpFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.updateLoading = true;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.updateLoading = false;
            state.updateError = false;
        },
        updateFail: (state, action) => {
            state.updateLoading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.currentUser = null;
            state.isLoading = false;
            state.error = false;
        }
    }
})

export const { signInStart, signInFail, signInSuccess, signUpStart, signUpSuccess, signUpFail, updateStart, updateSuccess, updateFail, signOut } = userSlice.actions;
export default userSlice.reducer;