import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        isAuthenticated: {},
        process: {
            type: "",
            message: ""
        }
    },

    reducers: {
        loginUser(state, action) {
            if (action.payload.isAuth) {
                state.isAuthenticated = action.payload
            }
            else {
                state.process = {
                    type: "login_error",
                    message: "Incorrect password, please try again."
                }
            }
        },

        logoutUser(state) {
            if (state.isAuthenticated.isAuth) {
                state.process = { type: "", message: "" }
                state.isAuthenticated = {}
            }
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

        resetProcess(state, action) {
            state.process = { type: action.payload ?? "", message: "" }
        }
    }
})

export const userActions = userSlice.actions
export default userSlice