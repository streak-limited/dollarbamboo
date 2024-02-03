import { Product } from '@/lib/types/product'

export const sortByExpensive = (
  product1: Product,
  product2: Product,
): number => {
  return product2.price - product1.price
}

export const sortByCheapest = (
  product1: Product,
  product2: Product,
): number => {
  return product1.price - product2.price
}
