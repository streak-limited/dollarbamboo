import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLanguage } from '../../hooks/useLanguage'
import { CartRootState } from '../../lib/types/cart'
import ProductPrice from '../UI/ProductPrice'
import { changeNumbersFormatEnToFa } from '../../utils/changeNumbersFormatEnToFa'
import { addData } from '@/query/supabase/api'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuth } from '@/utils/authProvider'
import { cartActions } from '@/store/cart-slice'
import { useRouter } from 'next/router'

const OrderSummaryBox = () => {
  const { t, locale } = useLanguage()
  const totalAmount = useSelector(
    (state: CartRootState) => state.cart.totalAmount,
  )
  const totalQuantity = useSelector(
    (state: CartRootState) => state.cart.totalQuantity,
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const cartItems = useSelector((state: CartRootState) => state.cart.items)
  const { user } = useAuth()
  const dispatch = useDispatch()
  const { push } = useRouter()

  // console.log('user', user)

  //mutation
  const addMutation = useMutation({
    mutationFn: addData,
    onSuccess: async () => {
      // toast.success(TEXT.TOAST_SUCCESS_EDIT_ADDRESS);
      // push(Paths.ACCOUNT_ADDRESS_BOOK);
      // selectedShopRefetch();
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const addOrderMutation = useMutation({
    mutationFn: addData,
    onSuccess: async () => {
      // toast.success(TEXT.TOAST_SUCCESS_EDIT_ADDRESS);
      // push(Paths.ACCOUNT_ADDRESS_BOOK);
      // selectedShopRefetch();
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const handleOrderSubmit = async () => {
    console.log('cartItems', cartItems)
    console.log('totalAmount', totalAmount)
    console.log('totalQuantity', totalQuantity)

    const delivery_charge = 0
    setIsLoading(true)
    // create transaction

    const new_transaction = await addMutation.mutateAsync({
      ref: 'transactions',
      user_id: user?.id,
      transaction_amount: totalAmount,
      discount_amount: 0,
      payment_status: 'unpaid',
      // extra_credit_card_charge,
      cart_total_amount: totalAmount,
      type: 'product',
      // payment_method: selectedPaymentOption,
    })
    const transaction_id = new_transaction && new_transaction[0]?.id
    console.log('transaction_id', transaction_id)

    let tmpOrder: any = {
      ref: 'orders',
      transaction_id: transaction_id,
      user_id: user?.id,
      shop_id: '104',
      order_status: 'pending',
      // shipping_method: order.shipping_method,
      total_amount: totalAmount + delivery_charge,
      subtotal_amount: totalAmount,
      discount_amount: 0,
      shipping_amount: delivery_charge,
      // remark: order.remark ?? '',
      order_gen_id: '', // later run genId()
      type: 'product',
    }

    const new_order = await addOrderMutation.mutateAsync(tmpOrder)
    const order_id = new_order && new_order[0]?.id

    // create order_items
    for (let index = 0; index < cartItems.length; index++) {
      const cart_item = cartItems[index]
      //add order_item
      let orderItem: any = {
        ref: 'order_items',
        order_id: order_id,
        product_id: cart_item.id,
        type: 'product',
        // choices: cart_item.choices,
        qty: cart_item.quantity,
      }
      console.log('orderItem', orderItem)
      addMutation.mutate(orderItem)
    }

    dispatch(cartActions.clearCart())
    toast.success(t.orderPlacedMsg)
    push('/')
    setIsLoading(false)
  }

  return (
    <>
      {totalQuantity > 0 ? (
        <div className="flex-grow sticky bottom-0 left-0 right-0 md:top-36 shadow-lg bg-palette-card border-2 rounded-lg py-4 xl:py-12 px-4 xl:px-8 -mx-[1rem] md:mx-4 xl:mx-8 mt-2 w-[100vw] md:w-auto  md:min-w-[300px] md:max-w-[400px]">
          <h3 className="text-md sm:text-lg md:text-xl">{t.orderSummary}</h3>
          <div className="flex flex-col my-1 sm:my-2">
            <div className="flex items-center justify-between md:my-4">
              <p className="text-sm sm:text-base text-palette-mute md:text-palette-base">
                {t.totalQuantity}
              </p>
              <p className="rtl:ml-1 ltr:mr-1 font-bold">
                {locale === 'en'
                  ? totalQuantity
                  : changeNumbersFormatEnToFa(totalQuantity)}
              </p>
            </div>
            <div className="flex flex-wrap items-baseline justify-between flex-grow md:my-4">
              <p className="text-sm sm:text-base text-palette-mute md:text-palette-base">
                {t.totalAmount}
              </p>
              <ProductPrice price={totalAmount} />
            </div>
          </div>
          <button
            className="block w-full bg-palette-primary md:mt-8 py-3 rounded-lg text-palette-side text-center shadow-lg"
            onClick={() => handleOrderSubmit()}
          >
            {t.order}
          </button>
        </div>
      ) : (
        <p className="text-palette-mute text-lg mx-auto mt-12">
          {t.cartIsEmpty}
        </p>
      )}
    </>
  )
}

export default OrderSummaryBox
