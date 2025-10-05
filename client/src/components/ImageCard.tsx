import React from 'react'

export default function ImageCard({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="group overflow-hidden rounded-3xl shadow-soft bg-white/80 dark:bg-white/5">
      <img src={src} alt={alt} loading="lazy" className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
      {caption && <figcaption className="p-3 text-sm opacity-80">{caption}</figcaption>}
    </figure>
  )
}
