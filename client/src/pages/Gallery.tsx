import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MasonryGrid from '../components/MasonryGrid'
import ImageCard from '../components/ImageCard'

export default function Gallery() {
  const items = Array.from({length: 12}, (_, i)=>({ id: i, src: `https://picsum.photos/seed/bfa${i}/600/800`, alt: 'Pieza de crochet'}))
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-3xl">Galería</h1>
          <input aria-label="Buscar" placeholder="Buscar..." className="rounded-xl border px-3 py-2 bg-white/60 dark:bg-white/10" />
        </div>
        <MasonryGrid>
          {items.map((it)=> <ImageCard key={it.id} src={it.src} alt={it.alt} />)}
        </MasonryGrid>
      </main>
      <Footer />
    </div>
  )
}
