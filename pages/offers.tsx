import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { client } from '../lib/client'
import { IProduct } from '../lib/types/products'
import ProductList from '../components/productList/ProductList'
import supabase from '@/lib/supabase'
import { Product } from '@/lib/types/product'
import { useQuery } from '@tanstack/react-query'

const offers: NextPage<{}> = ({}) => {
  //query
  const {
    data: products,
    isLoading: productsIsLoading,
    error: productsErrorIsLoading,
    refetch: productsRefetch,
  } = useQuery({
    queryKey: ['query-products-in-offer'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(*), options(*, variants(*)), addons(*)')
          .eq('shop_id', '104')
          .not('sale_price', 'is', null)
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

  return (
    <div>
      <ProductList productList={products ?? []} />
    </div>
  )
}

export default offers
