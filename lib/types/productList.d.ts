export interface ProductList {
  productsList: Product[] | []
}

export interface ProductListRootState {
  sortedProductsList: ProductList
}
