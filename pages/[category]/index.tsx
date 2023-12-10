import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import { client } from '../../lib/client'
import { IProduct } from '../../lib/types/products'
import ProductList from '../../components/productList/ProductList'
import { ICategoryPathsParams } from '../../lib/types/pagePathsParams'
import { useQuery } from '@tanstack/react-query'
import supabase from '@/lib/supabase'
import { useRouter } from 'next/router'
import { Product } from '@/lib/types/product'

const categoryPage: NextPage<{
  // products: IProduct[];
}> = ({}) => {
  const router = useRouter()
  const catParam = router.query.category

  const {
    data: products,
    isLoading: productsIsLoading,
    error: productsErrorIsLoading,
    refetch: productsRefetch,
  } = useQuery({
    queryKey: ['query-products-by-category-id-in-category', catParam],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(*), options(*, variants(*)), addons(*)')
          .eq('shop_id', '104')
          .filter('category', 'cs', `{"${catParam}"}`)

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
    enabled: !!catParam,
  })
  return <div>{products && <ProductList productList={products} />}</div>
}

export default categoryPage
