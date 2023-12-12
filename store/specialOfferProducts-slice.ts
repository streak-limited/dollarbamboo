import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProduct } from '../lib/types/products'
import { OfferProducts } from '../lib/types/offerProductsState'
import { Product } from '@/lib/types/product'

const initialState: OfferProducts = {
  specialOfferProducts: [],
}

const specialOfferProductsSlice = createSlice({
  name: 'specialOfferProducts',
  initialState,
  reducers: {
    addProducts(state, action: PayloadAction<Product[]>) {
      state.specialOfferProducts = action.payload
    },
  },
})

export const specialOfferProductsActions = specialOfferProductsSlice.actions

export default specialOfferProductsSlice.reducer
