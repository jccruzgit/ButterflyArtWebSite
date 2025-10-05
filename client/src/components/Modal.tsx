import React from 'react'
export default function Modal({ open, onClose, children }: any) {
  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={onClose}>
      <div className="max-w-xl w-full rounded-3xl bg-white dark:bg-neutral-900 p-6" onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
