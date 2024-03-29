import React from 'react'
import { IProduct } from '../../lib/types/products'
import Breadcrumb from '../UI/Breadcrumb'
import ImageSection from './ImageSection'
import DetailsSection from './DetailsSection'
import Benefits from '../Benefits'
import SimilarProducts from './SimilarProducts'
import { Product } from '@/lib/types/product'

interface Props {
  product: Product
  products: Product[]
}
const ProductDetails: React.FC<Props> = ({ product, products }) => {
  const similarProductsList = products
    ?.filter((similarProduct) => similarProduct.title !== product.title)
    .slice(0, 10)

  return (
    <div className="flex flex-col">
      <Breadcrumb />
      <div className="w-full xl:max-w-[2100px] mx-auto">
        <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap items-center md:items-start mt-8 relative">
          <ImageSection
            imgArray={product?.product_images ?? []}
            product={product}
          />
          <DetailsSection product={product} />
        </div>
        <div className="border-2 my-8">
          <Benefits />
        </div>
        {/* <SimilarProducts products={similarProductsList} /> */}
      </div>
    </div>
  )
}

export default ProductDetails
