import { Product } from '@/lib/types/product'
import { IProduct } from '../lib/types/products'

export function getTimeStamp(date: string) {
  const creationProductDate = new Date(date)
  return creationProductDate.getTime()
}

export const sortByTimeStamp = (
  product1: Product,
  product2: Product,
): number => {
  if (product2?.created_at && product1?.created_at) {
    return product2?.created_at - product1?.created_at
  }
  return 0
}

export const newestProductsFn = (products: Product[]) => {
  const productsWithTimeStamp = products.map((product) => {
    return {
      ...product,
      created_at: getTimeStamp(product.created_at!),
    }
  })
  return productsWithTimeStamp.sort(sortByTimeStamp)
}
