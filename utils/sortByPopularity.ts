import { Product } from '@/lib/types/product'
import { IProduct } from '../lib/types/products'

// export const sortByPoPularity = (
//   product1: Product,
//   product2: Product,
// ): number => {
//   return product2.starRating - product1.starRating
// }

export const sortByPoPularity = (product1: any, product2: any): number => {
  return product2.starRating - product1.starRating
}
