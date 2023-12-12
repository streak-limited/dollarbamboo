import Link from 'next/link'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cartUiActions } from '../../store/cartUI-slice'
import { useLanguage } from '../../hooks/useLanguage'
import { changeNumbersFormatEnToFa } from '../../utils/changeNumbersFormatEnToFa'
import { gbpCurrencyFormat } from '../../utils/currencyFormat'
import CartItem from './CartItem'
import { useExchangeRateGBPToIRR } from '../../hooks/useExchangeRateGBPToIRR'
import { IUserInfoRootState } from '../../lib/types/user'
import { useAuth } from '@/utils/authProvider'
import { Product } from '@/lib/types/product'
import { ICartRootState } from '@/lib/types/icart'
import { CartProduct, CartRootState } from '@/lib/types/cart'
import { cartActions } from '@/store/cart-slice'

const CartBox = () => {
  const { t, locale } = useLanguage()
  const dispatch = useDispatch()

  const cartItemQuantity = useSelector(
    (state: CartRootState) => state.cart.totalQuantity,
  )

  const cartTotalAmount = useSelector(
    (state: CartRootState) => state.cart.totalAmount,
  )

  const cartItems = useSelector((state: CartRootState) => state.cart.items)

  const { user } = useAuth()

  function onCloseCartBoxHandler() {
    dispatch(cartUiActions.toggleCartBox(false))
  }

  const irPrice = useExchangeRateGBPToIRR(cartTotalAmount)
  return (
    <div className="hidden lg:flex flex-col absolute top-full rtl:left-0 ltr:right-0 min-h-[15rem] max-h-[25rem] w-[20rem] bg-palette-card z-[110] shadow-md rounded-lg overflow-auto">
      <div className="relative">
        <header className="flex items-center justify-between sticky top-0 left-0 right-0 text-sm font-normal z-10 bg-palette-card p-2">
          <span>
            {locale === 'en'
              ? cartItemQuantity
              : changeNumbersFormatEnToFa(cartItemQuantity)}{' '}
            {t.product}
          </span>
          <span onClick={onCloseCartBoxHandler}>
            <Link href="/cart" className="text-cyan-500">
              {t.seeCart}
            </Link>
          </span>
          <button onClick={() => dispatch(cartActions.clearCart())}>
            Empty
          </button>
        </header>
        <hr className="mt-2" />
        <div>
          <>
            {cartItems.length ? (
              cartItems.map((item: any) => {
                return <CartItem key={item.id} product={item} />
              })
            ) : (
              <p className="mt-20 text-center text-palette-mute font-normal">
                {t.cartIsEmpty}
              </p>
            )}
          </>
        </div>
        {cartItems.length ? (
          <div className="flex items-center sticky bottom-0 left-0 right-0 bg-palette-card font-normal py-3 px-4">
            <div className="flex flex-col flex-grow ltr:mr-2 rtl:ml-2">
              <p className="text-sm">{t.payableAmount}</p>
              <p className="self-end text-sm font-bold">
                {locale === 'en'
                  ? `£ ${gbpCurrencyFormat(cartTotalAmount)}`
                  : `تومان ${irPrice}`}
              </p>
            </div>

            {!user ? (
              <div onClick={onCloseCartBoxHandler}>
                <Link
                  href={'/login'}
                  className="py-2 px-3 bg-palette-primary text-[12px] text-palette-side rounded-lg"
                >
                  {t.loginAndOrder}
                </Link>
              </div>
            ) : (
              <div onClick={onCloseCartBoxHandler}>
                <Link
                  href={'/cart'}
                  className="py-2 px-10 bg-palette-primary text-[12px] text-palette-side rounded-lg"
                >
                  {t.order}
                </Link>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default CartBox
