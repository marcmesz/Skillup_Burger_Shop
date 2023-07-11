import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: []
    },

    reducers: {
        loginUser(state, action) {

        },

        logoutUser(state, action) {

        },

        registerUser(state, action) {
            
        },

        addOrderToUser(state, action) {

        }
    }
})

export const userActions = userSlice.actions
export default userSlice