import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        process: {
            type: "",
            message: ""
        }
    },

    reducers: {
        loginUser(state, action) {
            if (action.payload.isAuthenticated) {
                const user = state.users.find(user => user.email === action.payload.email)
                const userIndex = state.users.findIndex(user => user.email === action.payload.email)
                const updateUsers = [...state.users]

                Object.assign(user, action.payload)
                updateUsers[userIndex] = user

                state.users = updateUsers
                state.process = {
                    type: "login_success",
                    message: ""
                }
            }
            else {
                state.process = {
                    type: "login_error",
                    message: "E-mail or password is incorrect."
                }
            }
        },

        logoutUser(state, action) {

        },

        registerUser(state, action) {
            const existingUser = state.users.find(user => user.email === action.payload.email)

            if (!existingUser) {
                state.users = [...state.users, action.payload]
                state.process = {
                    type: "reg_success",
                    message: ""
                }
            }
            else {
                state.process = {
                    type: "reg_error",
                    message: "E-mail is already in use, please choose another one."
                }
            }
        },

        addOrderToUser(state, action) {

        },

        resetProcess(state) {
            state.process = {
                type: "",
                message: ""
            }
        }
    }
})

export const userActions = userSlice.actions
export default userSlice