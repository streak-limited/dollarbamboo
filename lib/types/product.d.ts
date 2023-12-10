export interface Product {
  readonly id: string
  created_at?: Date | FieldValue
  updated_at?: Date | FieldValue
  category_id: string
  sub_category_id: string
  brand: string
  title: string
  unit: string
  description: string
  tags: string[]
  status: string
  category: string[]
  sub_category: string[]

  //missing in form

  price: number
  sale_price: number

  product_images: string[] | any

  options?: Option[]
  addons: Addon[]
  //missing in form

  stock: number
  long_description: string
  long_description_en: string
  shops?: Shop
  shop_id: string

  choices: CartChoice[]
}

export interface ProductListRootState {
  sortedProductsList: Product[]
}

export interface UploadDocument {
  readonly id: string
  created_at?: Date | FieldValue
  updated_at?: Date | FieldValue
  merchant_id?: string
  shop_id?: string
  activitiy_id?: string
  booking_id?: string
  group_id?: string
  product_id?: string
  takeaway_id?: string
  ticket_id?: string
  path: string
  display_order?: number
  type?: string
}
