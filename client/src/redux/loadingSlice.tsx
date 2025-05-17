import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: 'loader',
    initialState: false,
    reducers: {
        showLoader: () => {
            return true;
        },
        hideLoader: () => {
            return false;
        }
    }
})

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;