import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        process: ""
    },

    reducers: {
        loginUser(state, action) {

        },

        logoutUser(state, action) {

        },

        registerUser(state, action) {
            const existingUser = state.users.find(user => user.email === action.payload.email)
            if (!existingUser) {
                state.users = [...state.users, action.payload]
                state.process = "reg_success"
            }
            else {
                state.process = "reg_fail"
            }

            console.log(Object.assign({}, state))
        },

        addOrderToUser(state, action) {

        },

        resetProcess(state) {
            state.process = ""
        }
    }
})

export const userActions = userSlice.actions
export default userSlice