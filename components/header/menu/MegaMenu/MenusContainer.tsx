import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { activeMenuItemActions } from '../../../../store/activeMenuItem-slice'
import menuItems from '../../../../mock/menuItems'
import MenuItems from '../../../UI/MenuItems/MenuItems'
import { IDropDown } from '../../../../lib/types/dropDown'
import SubMenu from './SubMenu'
import { useQuery } from '@tanstack/react-query'
import supabase from '@/lib/supabase'

interface MenusContainerProps {
  menuItems: TransformedCategory[] | undefined
}

const MenusContainer: React.FC<MenusContainerProps> = ({ menuItems }) => {
  const [subMenuItems, setSubMenuItems] = useState<IDropDown[]>()
  const dispatch = useDispatch()
  function activeItem(
    submenuList: IDropDown[] | undefined,
    activeItemIndex: number,
    activeItemName: string,
  ) {
    setSubMenuItems(submenuList)
    dispatch(activeMenuItemActions.setActiveMenuItemIndex(activeItemIndex))
    dispatch(activeMenuItemActions.setActiveMenuItemText(activeItemName))
  }
  // let categories = allCategories?.filter((c) => c.parent_id == null)
  // categories?.sort((a, b) => a.display_order - b.display_order)

  // let subCategories = allCategories?.filter(
  //   (c) => c.parent_id === selectedCategoryId
  // );
  // subCategories?.sort((a, b) => a.display_order - b.display_order);

  useEffect(() => {
    if (menuItems) {
      setSubMenuItems(menuItems[0].productsGroup)
      return () => {
        dispatch(activeMenuItemActions.setActiveMenuItemIndex(0))
        dispatch(activeMenuItemActions.setActiveMenuItemText('Digital'))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className=" flex">
      <nav className="md:w-80 md:py-4 ltr:border-r-2 rtl:border-l-2 border-slate-300">
        <MenuItems onMouseOver={activeItem} menuItems={menuItems} />
      </nav>
      <SubMenu subMenuItems={subMenuItems} />
    </div>
  )
}

export default MenusContainer
