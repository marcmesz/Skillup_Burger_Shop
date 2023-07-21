import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        tax: 18,
        shipping: 200,
        totalItems: 0,
        taxTotal: 0,
        subTotal: 0,
        totalAmount: 0,
        orderConfirmed: false,
        orderCompleted: null
    },

    reducers: {
        addItemToCart(state, action) {
            const existingItem = state.items.find(item => item.id === action.payload.id)

            if (existingItem) {
                const itemIndex = state.items.findIndex(x => x.id === action.payload.id)
                const item = state.items[itemIndex]
                const updatedItem = { ...item, amount: item.amount + 1 }
                const subTotal = state.subTotal + item.price

                let updatedItemsArray = [...state.items]
                updatedItemsArray[itemIndex] = updatedItem

                state.items = updatedItemsArray
                state.subTotal = subTotal
            }
            else {
                action.payload = { ...action.payload, amount: 1 }
                state.items = [...state.items, action.payload]
                state.subTotal = state.subTotal + action.payload.price * action.payload.amount
            }

            state.totalItems = state.totalItems + 1
            state.taxTotal = (state.subTotal / 100) * state.tax
            state.totalAmount = state.subTotal + state.taxTotal + state.shipping
        },

        removeOneItemFromCart(state, action) {
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id)
            const existingItem = state.items[existingCartItemIndex]
            const updatedsubTotal = state.subTotal - existingItem.price

            let updatedItems
            if (existingItem.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== action.payload.id)
            } else {
                const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
                updatedItems = [...state.items]
                updatedItems[existingCartItemIndex] = updatedItem
            }

            state.taxTotal = state.taxTotal - ((existingItem.price / 100) * state.tax)
            state.items = updatedItems
            state.totalItems = state.totalItems - 1
            state.subTotal = updatedsubTotal

            if (state.subTotal === 0) {
                state.totalAmount = 0
            }
            else {
                state.totalAmount = state.subTotal + state.taxTotal + state.shipping
            }
        },

        setCartEmpty(state) {
            state.items = []
            state.totalItems = 0
            state.taxTotal = 0
            state.subTotal = 0
            state.totalAmount = 0
            state.orderConfirmed = false
            state.orderCompleted = null
        }
    }
})

export const cartActions = cartSlice.actions
export default cartSlice