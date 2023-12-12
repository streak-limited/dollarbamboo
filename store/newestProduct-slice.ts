import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProduct } from '../lib/types/products'
import { Product } from '@/lib/types/product'

const initialState: Product[] = []

const newestProductsSlice = createSlice({
  name: 'newestProducts',
  initialState,
  reducers: {
    addProducts(state, action: PayloadAction<{ productsList: Product[] }>) {
      return action.payload.productsList
    },
  },
})

export const newestProductsActions = newestProductsSlice.actions

export default newestProductsSlice.reducer
