import React from 'react'
export default function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-full bg-butterfly-100 dark:bg-butterfly-800 text-butterfly-800 dark:text-butterfly-100 px-2 py-0.5 text-xs">{children}</span>
}
