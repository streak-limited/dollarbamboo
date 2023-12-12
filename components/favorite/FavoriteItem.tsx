import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { favoriteActions } from '../../store/favorite-slice'
import { cartActions } from '../../store/cart-slice'
import { useLanguage } from '../../hooks/useLanguage'
import { urlFor } from '../../lib/client'
import ProductPrice from '../UI/ProductPrice'
import { BsCartPlus } from 'react-icons/bs'
import { HiOutlineTrash } from 'react-icons/hi'
import { IProduct } from '../../lib/types/products'
import { useTheme } from 'next-themes'
import { Product } from '@/lib/types/product'

interface Props {
  product: Product
}
const FavoriteItem: React.FC<Props> = ({ product }) => {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const dispatch = useDispatch()

  function onRemoveFavoriteItem(productSlug: string) {
    dispatch(favoriteActions.removeFromFavorite(productSlug))
  }

  function onAddToCart(product: Product) {
    dispatch(cartActions.addItemToCart({ product: product, quantity: 1 }))
    toast.success(t.productAddedToCartMsg, {
      theme: theme === 'dark' ? 'dark' : 'light',
    })
  }
  return (
    <div className="col-span-6 sm:col-span-3 lg:col-span-4 xl:col-span-3 flex flex-col w-full h-full px-2 my-2 shadow-lg rounded-md bg-palette-card relative">
      <Link
        href={`/${product.category[0]}/${product.sub_category[0]}/${product.id}`}
        className="flex flex-col w-full p-3 flex-grow"
      >
        <div className="text-center">
          {product?.product_images && (
            <Image
              src={product?.product_images[0].path ?? ''}
              alt="laptop image"
              width={200}
              height={185}
              className="object-contain hover:scale-105 transition-transform !p-2"
            />
          )}
          {product.sale_price ? (
            <span className="block absolute -top-2 -right-2">
              <Image
                src="/images/discount-icon/discount.webp"
                width={40}
                height={40}
                alt="discount-icon"
              />
            </span>
          ) : null}
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <p>{product?.title}</p>
          <ProductPrice price={product.price} discount={product.sale_price} />
        </div>
      </Link>
      <div className="flex flex-wrap items-center mb-3 mx-4">
        <button
          className="flex items-center flex-grow border-2 border-palette-primary rounded-md shadow-md text-palette-primary justify-center py-1 rtl:ml-2 ltr:mr-2 my-2 sm:my-0 text-sm sm:text-base"
          onClick={() => onAddToCart(product)}
        >
          <span className="ltr:mr-1 rtl:ml-1">
            <BsCartPlus />
          </span>
          {t.addToCart}
        </button>
        <button
          className="flex items-center border-2 border-gray-600/40 dark:border-gray-200/60 shadow-md rounded-md py-1 px-3 text-palette-base/60 text-sm sm:text-base"
          onClick={() => onRemoveFavoriteItem(product.title)}
        >
          <span className="ltr:mr-1 rtl:ml-1">
            <HiOutlineTrash />
          </span>
          {t.delete}
        </button>
      </div>
    </div>
  )
}

export default FavoriteItem
