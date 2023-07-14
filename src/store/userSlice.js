import { createSlice } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        process: ""
    },

    reducers: {
        loginUser(state, action) {
            const findUser = state.users.find(user => user.email === action.payload.email)
            if (findUser) {
                bcrypt.compare(action.payload.password, findUser.password).then(isAuth => {
                    if (isAuth) {
                        console.log("You logged in.")
                    }
                    else{
                        console.log("Password is incorrect")
                    }
                })
            }
            else{
                console.log("E-mail or Password is incorrect.")
            }
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
                state.process = "reg_error"
            }
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