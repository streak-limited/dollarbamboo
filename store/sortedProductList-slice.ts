import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProduct } from '../lib/types/products'
import { sortByPoPularity } from '../utils/sortByPopularity'
import { sortByCheapest, sortByExpensive } from '../utils/sortByCost'
import { newestProductsFn } from '../utils/sortByTimeStamp'
import { Product } from '@/lib/types/product'

const initialState: Product[] = []

const SortedProductsListSlice = createSlice({
  name: 'sortedProductsList',
  initialState,
  reducers: {
    sortProductsList(
      state,
      action: PayloadAction<{ productsList: Product[]; sortBasedOn: string }>,
    ) {
      switch (action.payload.sortBasedOn) {
        case 'all':
          return action.payload.productsList // Replace the entire state
        case 'newestProducts':
          return newestProductsFn(action.payload.productsList)
        // case 'popular':
        //   return [...action.payload.productsList].sort(sortByPoPularity);
        case 'cheapest':
          return [...action.payload.productsList].sort(sortByCheapest)
        case 'expensive':
          return [...action.payload.productsList].sort(sortByExpensive)
        default:
          return state // Return the current state if no matching case
      }
    },
  },
})

export const SortedProductsListActions = SortedProductsListSlice.actions

export default SortedProductsListSlice.reducer
