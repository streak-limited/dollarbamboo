import { Favorite } from '@/lib/types/favorite'
import { Product } from '@/lib/types/product'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFavorite } from '../lib/types/ifavorite'
import { IProduct } from '../lib/types/products'

const initialState: Favorite = {
  items: [],
}

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite(state, action: PayloadAction<Product>) {
      state.items.push({
        ...action.payload,
      })
    },
    removeFromFavorite(state, action: PayloadAction<string>) {
      const productSlug = action.payload
      state.items = state.items.filter((item) => item.title !== productSlug)
    },
    clearCart(state) {
      state = initialState
    },
  },
})

export const favoriteActions = favoriteSlice.actions

export default favoriteSlice.reducer
