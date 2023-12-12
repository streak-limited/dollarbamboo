import { Product } from './product'
import { IProduct } from './products'
export interface IFavorite {
  items: IProduct[]
}

export interface IFavoriteRootState {
  favorite: IFavorite
}

export interface Favorite {
  items: Product[]
}

export interface FavoriteRootState {
  favorite: Favorite
}
