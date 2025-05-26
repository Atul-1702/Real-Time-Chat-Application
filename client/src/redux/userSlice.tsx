import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: { user: null, selectedUser: null, userAllChats: null },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setUserAllChats: (state, action) => {
            state.userAllChats = action.payload;
        }
    }
});

export const { setUser, setSelectedUser, setUserAllChats } = userSlice.actions;
export default userSlice.reducer;