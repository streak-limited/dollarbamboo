import type { NextPage } from 'next'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'

import { useDispatch } from 'react-redux'
import { specialOfferProductsActions } from '../store/specialOfferProducts-slice'
import { newestProductsActions } from '../store/newestProduct-slice'

import { client } from '../lib/client'

import Benefits from '../components/Benefits'
import Carousel from '../components/carousel'
const Offers = dynamic(() => import('../components/Offers/Offers'))
// const Category = dynamic(() => import('../components/category/Category'))
const Newest = dynamic(() => import('../components/newest/Newest'))
const Brands = dynamic(() => import('../components/brands'))
const Banners = dynamic(() => import('../components/banners'), { ssr: false })

import { newestProductsFn } from '../utils/sortByTimeStamp'
import { useAuth } from '@/utils/authProvider'
import { Product } from '@/lib/types/product'
import Category from '@/components/category/Category'
import supabase from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

const Home: NextPage<{}> = ({}) => {
  const dispatch = useDispatch()
  const { user } = useAuth()
  console.log('user', user)

  //query
  const {
    data: products,
    isLoading: productsIsLoading,
    error: productsErrorIsLoading,
    refetch: productsRefetch,
  } = useQuery({
    queryKey: ['query-products-in-home'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(*), options(*, variants(*)), addons(*)')
          .eq('shop_id', '104')
          .order('created_at', {
            ascending: false,
          })
        return data as Product[]
      } catch (error) {
        // Handle the error appropriately, e.g., log it or throw a custom error
        console.error('Error fetching user data:', error)
        throw new Error('Failed to fetch user data')
      }
    },
  })

  useEffect(() => {
    if (products) {
      //add products to offers list
      const offersProducts = products.filter((item) => item.sale_price)
      dispatch(specialOfferProductsActions.addProducts(offersProducts))

      //add products to newest list
      const sortedProductsByTimeStamp = newestProductsFn(products)
      dispatch(
        newestProductsActions.addProducts({
          productsList: sortedProductsByTimeStamp,
        }),
      )
    }
  }, [dispatch, products])
  return (
    <div>
      <Carousel />
      <Benefits />
      {/* <Offers /> */}
      {/* <Category /> */}
      {/* <Newest /> */}
      {/* <Banners /> */}
      {/* <Brands /> */}
    </div>
  )
}

export default Home
