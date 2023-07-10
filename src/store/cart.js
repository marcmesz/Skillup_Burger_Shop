import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        tax: 18,
        shipping: 200,
        totalItems: 0,
        totalTax: 0,
        totalAmount: 0
    },

    reducers: {
        addItemToCart(state, action) {
            const existingItem = state.items.find(item => item.id === action.payload.id)

            if (existingItem) {
                const itemIndex = state.items.findIndex(x => x.id === action.payload.id)
                const item = state.items[itemIndex]
                const updatedItem = { ...item, amount: item.amount + 1 }
                const totalAmount = state.totalAmount + item.price

                let updatedItemsArray = [...state.items]
                updatedItemsArray[itemIndex] = updatedItem

                state.items = updatedItemsArray
                state.totalAmount = totalAmount
            }
            else {
                state.items = [...state.items, action.payload]
                state.totalAmount = state.totalAmount + action.payload.price * action.payload.amount
            }

            state.totalItems = state.totalItems + 1

            console.log(Object.assign({}, state))
        },

        removeOneItemFromCart(state, action) {
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id)
            const existingItem = state.items[existingCartItemIndex]
            const updatedTotalAmount = state.totalAmount - existingItem.price

            let updatedItems
            if (existingItem.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== action.payload.id)
            } else {
                const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
                updatedItems = [...state.items]
                updatedItems[existingCartItemIndex] = updatedItem
            }

            state.items = updatedItems
            state.totalAmount = updatedTotalAmount
            state.totalItems = state.totalItems - 1
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice