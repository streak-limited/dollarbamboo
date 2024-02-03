import React from 'react'
// import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'

export default function MenuItem({
  icon,
  title,
  action,
  isActive = null,
}: {
  icon: string
  title: string
  action: any
  isActive: any
}) {
  return (
    <button
      className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
      onClick={action}
      title={title}
    >
      {icon}
      {/* <svg className="remix">
        <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
      </svg> */}
    </button>
  )
}
