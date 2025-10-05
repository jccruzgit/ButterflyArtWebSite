import React from 'react'
import clsx from 'clsx'

export default function Button({ as: Tag = 'button', className, children, ...props }: any) {
  return (
    <Tag
      className={clsx(
        'inline-flex items-center justify-center rounded-2xl px-4 py-2 font-semibold shadow-soft transition-transform duration-200',
        'bg-butterfly-600 text-white hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-butterfly-500',
        'dark:bg-butterfly-500',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
