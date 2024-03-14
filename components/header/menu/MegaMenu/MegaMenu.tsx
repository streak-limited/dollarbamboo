import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { megaMenuActions } from '../../../../store/megaMenu-slice'
import { Transition } from 'react-transition-group'
import { useLanguage } from '../../../../hooks/useLanguage'
import { GoGrabber } from 'react-icons/go'
import MenusContainer from './MenusContainer'
import { IMegaMenuRootState } from '../../../../lib/types/megaMenu'
import supabase from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'
import { IDropDown } from '@/lib/types/dropDown'

const MegaMenu = () => {
  const nodeRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const dispatch = useDispatch()
  const [menuItems, setMenuItems] = useState<TransformedCategory[]>()

  function showMegaMenuHandler() {
    dispatch(megaMenuActions.openMegaMenu())
  }
  function closeMegaMenuHandler() {
    dispatch(megaMenuActions.closeMegaMenu())
  }
  const isMegaMenuOpen = useSelector(
    (state: IMegaMenuRootState) => state.megaMenu.isMegaMenuOpen,
  )

  //query

  const {
    data: allCategories,
    isLoading: allCategoriesIsLoading,
    error: allCategoriesErrorIsLoading,
    refetch: allCategoriesRefetch,
  } = useQuery({
    queryKey: ['query-categories-in-category-container'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .filter('type', 'eq', 'product')
          .filter('shop_id', 'eq', '104')

        return data as ProductCategory[]
      } catch (error) {
        console.error('Error fetching user data:', error)
        throw new Error('Failed to fetch user data')
      }
    },
  })
  // console.log('allCategories', allCategories)

  const transformCategories = (categories: ProductCategory[]): any[] => {
    const rootCategories = categories.filter((cat) => cat.has_children)
    const childCategories = categories.filter((cat) => !cat.has_children)

    return rootCategories.map((rootCat) => {
      const children = childCategories
        .filter((childCat) => childCat.parent_id === rootCat.id)
        .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
        .map((childCat) => ({
          title: childCat.name,
          icon: childCat.name,
          subtitles: childCat.name,
        }))

      return {
        category: rootCat.name,
        icon: rootCat.name,
        productsGroup: children,
      }
    })
  }

  const transformedCategories = useMemo(() => {
    if (allCategories) {
      return transformCategories(allCategories)
    }
    return []
  }, [allCategories])

  // console.log('allCategories')
  useEffect(() => {
    if (transformedCategories && transformedCategories.length > 0) {
      setMenuItems(transformedCategories)
    }
  }, [transformedCategories])

  // console.log('transformedCategories', menuItems)
  return (
    <div
      className="flex items-center"
      onMouseOver={showMegaMenuHandler}
      onMouseOut={closeMegaMenuHandler}
    >
      <div className="flex items-center font-bold cursor-pointer">
        <GoGrabber style={{ fontSize: '2rem' }} />
        <h3 className="ltr:ml-1 rtl:mr-1">{t.CategoryOfGoods}</h3>
      </div>

      {/* @ts-ignore */}
      <Transition
        nodeRef={nodeRef}
        in={isMegaMenuOpen!}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        {(state) => {
          return (
            <div ref={nodeRef} className="z-[100]">
              <div
                className={`fixed top-[8.2rem] inset-0 bg-gray-600/60
                ${
                  state === 'entering'
                    ? 'animate-fadeEntering'
                    : state === 'entered'
                    ? 'opacity-100'
                    : 'animate-fadeExit'
                }
                `}
                onClick={closeMegaMenuHandler}
              ></div>
              <div className="absolute top-full left-0 right-0 bg-palette-card z-[110] shadow-md rounded-br-lg rounded-bl-lg">
                <MenusContainer menuItems={menuItems} />
              </div>
            </div>
          )
        }}
      </Transition>
    </div>
  )
}

export default MegaMenu
