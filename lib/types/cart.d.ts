import { IProductDetails, TSlug } from './products'

export interface CartProduct {
  // image: any
  title: string
  slug: TSlug
  price: number
  sale_price?: number
  brand: string
  category: string[]
  starRating?: number
  isOffer?: boolean
  // details?: IProductDetails[];
  created_at?: string
  quantity: number
  totalPrice: number
}

export interface CartUI {
  cartBoxIsVisible: boolean
}

export interface Cart {
  items: CartProduct[]
  totalQuantity: number
  totalAmount: number
}

//RootState interface => use for state type in useSelector hook

export interface CartUiRootState {
  cartUi: CartUI
}
export interface CartRootState {
  cart: Cart
}
