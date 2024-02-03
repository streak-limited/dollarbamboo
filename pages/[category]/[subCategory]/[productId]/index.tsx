import supabase from '@/lib/supabase'
import { Product } from '@/lib/types/product'
import { useQuery } from '@tanstack/react-query'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import ProductDetails from '../../../../components/productDetails'
import { client } from '../../../../lib/client'
import { ISlugPathsParams } from '../../../../lib/types/pagePathsParams'
import { IProduct } from '../../../../lib/types/products'

const productDetailsPage: NextPage<{}> = ({}) => {
  const router = useRouter()
  const catParam = router.query.category
  const subCatParam = router.query.subCategory
  const productIdParam = router.query.productId

  console.log('searchParams', catParam, subCatParam)

  const {
    data: products,
    isLoading: productsIsLoading,
    error: productsErrorIsLoading,
    refetch: productsRefetch,
  } = useQuery({
    queryKey: [
      'query-products-by-category-id-in-product-detail',
      catParam,
      subCatParam,
    ],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(*), options(*, variants(*)), addons(*)')
          .eq('shop_id', '104')
          .filter('category', 'cs', `{"${catParam}"}`)
          .filter('sub_category', 'cs', `{"${subCatParam}"}`)
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
    enabled: !!catParam || !!subCatParam,
  })

  const {
    data: product,
    isLoading: productIsLoading,
    error: productErrorIsLoading,
    refetch: productRefetch,
  } = useQuery({
    queryKey: ['query-product-by-id-in-product-detail', productIdParam],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(*), options(*, variants(*)), addons(*)')
          .eq('id', productIdParam)
          .order('created_at', {
            ascending: false,
          })
          .single()
        return data as Product
      } catch (error) {
        // Handle the error appropriately, e.g., log it or throw a custom error
        console.error('Error fetching user data:', error)
        throw new Error('Failed to fetch user data')
      }
    },
    enabled: !!productIdParam,
  })
  return (
    <div>
      {product && products && (
        <ProductDetails product={product} products={products} />
      )}
    </div>
  )
}

export default productDetailsPage
