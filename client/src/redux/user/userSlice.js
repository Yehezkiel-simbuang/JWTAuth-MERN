import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isLoading: false,
        error: false,
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
        }
    }
})

export const { signInStart, signInFail, signInSuccess } = userSlice.actions;
export default userSlice.reducer;