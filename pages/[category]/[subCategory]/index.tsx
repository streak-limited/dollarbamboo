import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import { client } from '../../../lib/client'
import { IProduct } from '../../../lib/types/products'
import ProductList from '../../../components/productList/ProductList'
import { ISubCategoryPathsParams } from '../../../lib/types/pagePathsParams'
import { useQuery } from '@tanstack/react-query'
import supabase from '@/lib/supabase'

const subCategory: NextPage<{
  // products: IProduct[]
}> = ({}) => {
  const {
    data: products,
    isLoading: productsIsLoading,
    error: productsErrorIsLoading,
    refetch: productsRefetch,
  } = useQuery({
    queryKey: ['query-products-by-category-id'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, categories(*)')
          // .filter('shops.merchant_id', 'eq', )
          // .filter('parent_id', 'is', null)
          .order('created_at', {
            ascending: false,
          })
        // router.refresh();
        return data as IProduct[]
      } catch (error) {
        // Handle the error appropriately, e.g., log it or throw a custom error
        console.error('Error fetching user data:', error)
        throw new Error('Failed to fetch user data')
      }
    },
    // enabled: !!merchantId,
  })
  console.log('products', products)
  return <div>{products && <ProductList productList={products} />}</div>
}

export default subCategory

// export const getStaticPaths: GetStaticPaths = async () => {
//   const query = `*[_type=="product"]{
//     "category":category[0],
//     "subCategory":category[1],
//   }`
//   const products = await client.fetch(query)
//   const paths = products.map((product: ISubCategoryPathsParams) => ({
//     params: {
//       category: product.category.toString(),
//       subCategory: product.subCategory.toString(),
//     },
//   }))
//   return {
//     fallback: 'blocking',
//     paths,
//   }
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const subCategory = context.params?.subCategory
//   const category = context.params?.category
//   const productQuery = `*[_type=='product'&& category[0]=="${category}" && category[1]=="${subCategory}"]`
//   const products = await client.fetch(productQuery)

//   // return {
//   //   props: {
//   //     products: products,
//   //   },
//   // }
// }
