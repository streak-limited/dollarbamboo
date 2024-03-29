import React, { useEffect, useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { IProduct } from '../../lib/types/products'
import SubmenuCategory from './SubmenuCategory'
import Card from '../UI/card/Card'
import Breadcrumb from '../UI/Breadcrumb'
import Sort from './Sort'
import { useDispatch, useSelector } from 'react-redux'
import { SortedProductsListActions } from '../../store/sortedProductList-slice'
import { useRouter } from 'next/router'
import { Product, ProductListRootState } from '@/lib/types/product'

interface Props {
  productList: Product[]
}
const ProductList: React.FC<Props> = ({ productList }) => {
  const router = useRouter()
  const { t } = useLanguage()
  let isInNewestProductsPage =
    router.pathname === '/newestProducts' ? true : false

  const [selectedRadioBtn, setSelectedRadioBtn] = useState<string>('all')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      SortedProductsListActions.sortProductsList({
        productsList: productList,
        sortBasedOn: selectedRadioBtn,
      }),
    )
  }, [dispatch, productList, selectedRadioBtn])

  const sortedProductList = useSelector(
    (state: ProductListRootState) => state.sortedProductsList,
  )

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedRadioBtn(e.currentTarget.id)
  }

  // console.log('productList', sortedProductList)

  return (
    <div>
      <Breadcrumb />
      <SubmenuCategory />

      <div className="w-full xl:max-w-[2100px] mx-auto">
        {isInNewestProductsPage && productList.length ? (
          <div className="grid gap-4 md:gap-2 grid-cols-6 md:grid-cols-12">
            {productList
              ? productList.map((product: Product) => {
                  // console.log('product', product)
                  return <Card key={product.id} product={product} />
                })
              : null}
          </div>
        ) : sortedProductList && sortedProductList.length ? (
          <div>
            <Sort
              selectedBtn={selectedRadioBtn}
              onChangeSelectedBtn={onChangeHandler}
            />
            <div className="grid gap-4 md:gap-2 grid-cols-6 md:grid-cols-12">
              {sortedProductList.map((product: Product) => {
                // console.log('product', product)

                return <Card key={product.id} product={product} />
              })}
            </div>
          </div>
        ) : (
          <p className="text-palette-mute text-center mt-8">{t.noProduct}</p>
        )}
      </div>
    </div>
  )
}

export default ProductList
