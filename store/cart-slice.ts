import { Product } from '@/lib/types/product'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cart } from '@/lib/types/cart'
import { IProduct } from '../lib/types/products'
import { calculateDiscountPercentage } from '../utils/calculateDiscountPercentage'

const initialState: Cart = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(
      state: Cart,
      action: PayloadAction<{ product: Product; quantity: number }>,
    ) {
      const newItem = action.payload.product

      const existingItem = state.items.find(
        (item) => item.title === newItem.title,
      )

      state.totalQuantity = state.totalQuantity + action.payload.quantity

      state.totalAmount =
        state.totalAmount +
        action.payload.quantity *
          (action.payload.product.sale_price
            ? action.payload.product.sale_price
            : action.payload.product.price)

      if (!existingItem) {
        const totalPrice =
          (newItem.sale_price ? newItem.sale_price : newItem.price) *
          action.payload.quantity

        state.items.push({
          ...newItem,
          quantity: action.payload.quantity,
          totalPrice,
          slug: {
            _type: '',
            current: '',
          },
        })
      } else {
        const totalPrice =
          existingItem.totalPrice +
          (existingItem.sale_price
            ? existingItem.sale_price * action.payload.quantity
            : existingItem.price * action.payload.quantity)

        existingItem.quantity += action.payload.quantity
        existingItem.totalPrice = totalPrice
      }
    },

    removeItemFromCart(
      state: Cart,
      action: PayloadAction<string>, //title as payload
    ) {
      const productSlug = action.payload
      const existingItem = state.items.find(
        (item) => item.title === productSlug,
      )

      state.totalQuantity--

      state.totalAmount =
        state.totalAmount -
        (existingItem?.sale_price
          ? existingItem.sale_price
          : existingItem?.price)!

      if (existingItem?.quantity === 1) {
        state.items = state.items.filter((item) => item.title !== productSlug)
      } else {
        existingItem!.quantity--
        existingItem!.totalPrice =
          existingItem!.totalPrice -
          (existingItem?.sale_price
            ? existingItem.sale_price
            : existingItem?.price)!
      }
    },

    clearCart(state) {
      state.items = initialState.items
      state.totalQuantity = initialState.totalQuantity
      state.totalAmount = initialState.totalAmount
    },
  },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer
