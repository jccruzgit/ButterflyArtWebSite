import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MasonryGrid from '../components/MasonryGrid'
import ImageCard from '../components/ImageCard'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection'
import type { Category, Product } from '../types'

const FALLBACK_IMAGE = 'https://placehold.co/600x800/fff7e5/4c1d95?text=ButterflyArt'

export default function Gallery() {
  const [params] = useSearchParams()
  const category = params.get('c') || 'todas'
  const [query, setQuery] = React.useState('')

  const { data: categories } = useFirestoreCollection<Category>('categories', { orderBy: [['order', 'asc']] })
  const { data: products, loading: loadingProducts } = useFirestoreCollection<Product>('products', {
    where: [['status', '==', 'published']],
    orderBy: [['createdAt', 'desc']],
  })

  const slugToCategoryId = React.useMemo(() => {
    const map = new Map<string, string>()
    categories.forEach((cat) => {
      map.set(cat.slug ?? cat.id, cat.id)
    })
    return map
  }, [categories])

  const catalog = React.useMemo(() => {
    return products.map((product) => {
      const cover = product.images?.[0]
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        image: cover?.url ?? FALLBACK_IMAGE,
        alt: cover?.alt ?? product.title,
        categoryId: product.categoryId,
      }
    })
  }, [products, categories])

  const selectedCategoryId = slugToCategoryId.get(category)
  const filteredByCategory = selectedCategoryId ? catalog.filter((item) => item.categoryId === selectedCategoryId) : catalog
  const normalizedQuery = query.trim().toLowerCase()
  const filtered = normalizedQuery
    ? filteredByCategory.filter((it) => it.title.toLowerCase().includes(normalizedQuery))
    : filteredByCategory

  const cats = React.useMemo(
    () => [{ key: 'todas', label: 'Todas' }, ...categories.map((cat) => ({ key: cat.slug ?? cat.id, label: cat.name }))],
    [categories]
  )

  const trackSearch = React.useCallback((term: string) => {
    if (!term) return
    try {
      ;(window as any).gtag?.('event', 'search', {
        search_term: term,
        search_category: category,
      })
    } catch {}
  }, [category])

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    trackSearch(query.trim())
  }

  return (
    <div>
      <Navbar />
      <main id="contenido" className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="font-display text-3xl">Galeria{category !== 'todas' ? ` - ${category}` : ''}</h1>
            <p className="text-sm opacity-70" aria-live="polite">
              {loadingProducts ? 'Cargando piezas...' : `${filtered.length} piezas visibles`}
            </p>
          </div>
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <input
              aria-label="Buscar"
              placeholder="Buscar..."
              className="rounded-xl border px-3 py-2 bg-white/60 dark:bg-white/10"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit" className="px-4 py-2 rounded-xl border bg-white/70 dark:bg-white/5">
              Buscar
            </button>
          </form>
        </div>
        <nav aria-label="Filtrar por categoria" className="mb-6 flex gap-2 flex-wrap">
          {cats.map((c) => {
            const active = c.key === category
            return (
              <Link
                key={c.key}
                to={c.key === 'todas' ? '/gallery' : `/gallery?c=${c.key}`}
                aria-current={active ? 'true' : undefined}
                className={`px-3 py-1.5 rounded-full border transition ${active ? 'bg-butterfly-100 dark:bg-white/10 border-butterfly-400' : 'bg-white/60 dark:bg-white/5'}`}
              >
                {c.label}
              </Link>
            )
          })}
        </nav>
        <MasonryGrid>
          {filtered.map((it) => (
            <ImageCard key={it.id} src={it.image} alt={it.alt} caption={it.title} />
          ))}
        </MasonryGrid>
        {!loadingProducts && filtered.length === 0 && (
          <p className="mt-6 text-center opacity-70">No hay piezas que coincidan con tu busqueda en esta categoria.</p>
        )}
      </main>
      <Footer />
    </div>
  )
}
