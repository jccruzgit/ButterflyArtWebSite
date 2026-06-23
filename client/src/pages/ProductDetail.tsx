import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection'
import type { Product } from '../types'

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { data: products, loading } = useFirestoreCollection<Product>('products', {
    where: [['slug', '==', slug ?? '']],
    limit: 1,
  })
  const product = products[0]

  React.useEffect(() => {
    if (!loading && !product) navigate('/gallery', { replace: true })
  }, [loading, product, navigate])

  if (!product) {
    return (
      <div>
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-10">
          {loading ? <p>Cargando...</p> : <p>No encontramos esta pieza.</p>}
        </main>
        <Footer />
      </div>
    )
  }

  const cover = product.images?.[0]
  const range = product.priceMin && product.priceMax ? `$${product.priceMin} - $${product.priceMax}` : null

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 grid md:grid-cols-2 gap-8">
        <div className="rounded-3xl overflow-hidden bg-white/80 dark:bg-white/5 shadow-soft aspect-square flex items-center justify-center">
          {cover ? (
            <img src={cover.url} alt={cover.alt || product.title} className="w-full h-full object-cover" />
          ) : (
            <span className="opacity-50">Sin imagen</span>
          )}
        </div>
        <div>
          <h1 className="font-display text-3xl">{product.title}</h1>
          <div className="mt-2 flex gap-2">
            {product.customizable && <Badge>Personalizable</Badge>}
          </div>
          <p className="mt-4 opacity-80">{product.description}</p>
          {range && <p className="mt-2 text-sm opacity-70">Rango de precio: {range}</p>}
          <div className="mt-6">
            <Button as="a" href="/custom-order">Solicitar personalizacion</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

