import React from 'react'

export default function MasonryGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
      <div className="[&>*]:mb-4">{children}</div>
    </div>
  )
}
