import { FavoriteRootState } from '@/lib/types/favorite'
import React from 'react'
import { useSelector } from 'react-redux'
import { useLanguage } from '../../hooks/useLanguage'
import FavoriteItem from './FavoriteItem'

const Favorites = () => {
  const { t } = useLanguage()
  const favoriteItems = useSelector(
    (state: FavoriteRootState) => state.favorite.items,
  )

  console.log('favoriteItems', favoriteItems)
  return (
    <div className="w-full xl:max-w-[2100px] mx-auto">
      {favoriteItems.length ? (
        <div className="grid gap-4 grid-cols-6 lg:grid-cols-12">
          {favoriteItems.map((favoriteItem) => (
            <FavoriteItem key={favoriteItem.title} product={favoriteItem} />
          ))}
        </div>
      ) : (
        <p>{t.thereAreNoFavorites}</p>
      )}
    </div>
  )
}

export default Favorites
