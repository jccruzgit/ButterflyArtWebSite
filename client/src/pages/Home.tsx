import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { setSEO } from '../lib/seo'
import LogoTransparent from '../assets/logo-transparente.png'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection'
import type { Category } from '../types'

export default function Home() {
  const { data: categories, loading: loadingCategories } = useFirestoreCollection<Category>('categories', {
    orderBy: [['order', 'asc']],
  })
  const featuredCollections = categories.slice(0, 3)

  React.useEffect(
    () =>
      setSEO({
        title: 'ButterflyArt.sv - Crochet artesanal',
        description: 'Amigurumis, accesorios y piezas personalizadas en crochet.',
        image: '/og.jpg',
      }),
    []
  )

  return (
    <div>
      <Navbar />
      <main id="contenido">
        <section className="mx-auto max-w-6xl px-4 pt-16 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <h1 className="font-display text-4xl md:text-5xl">
                Arte de crochet que <span className="text-butterfly-600">cobra vida</span>
              </h1>
              <p className="mt-4 opacity-80">
                Piezas unicas hechas a mano: amigurumis, accesorios y pedidos personalizados.
              </p>
              <div className="mt-6 flex gap-3">
                <Button as={Link} to="/gallery">Ver Galeria</Button>
                <Button as={Link} to="/custom-order" className="bg-white text-butterfly-700 border dark:bg-neutral-900 dark:text-white">Pedir Personalizado</Button>
              </div>
            </div>
            <motion.div
              className="aspect-[4/3] rounded-3xl bg-gradient-to-tr from-pastel-cream to-pastel-lavender shadow-soft overflow-hidden flex items-center justify-center"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={LogoTransparent}
                alt="ButterflyArt logo"
                className="w-full h-full object-contain p-6"
                width={500}
                height={500}
                decoding="async"
                fetchpriority="high"
              />
            </motion.div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="font-display text-2xl mb-6">Colecciones destacadas</h2>
          {loadingCategories && <p className="text-sm opacity-70">Cargando colecciones...</p>}
          {!loadingCategories && featuredCollections.length === 0 && (
            <p className="text-sm opacity-70">Aun no hay colecciones. Administra categorias desde el panel.</p>
          )}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featuredCollections.map((collection) => (
              <Link
                key={collection.id}
                to={`/gallery?c=${collection.slug ?? collection.id}`}
                className="rounded-3xl p-6 bg-white/80 dark:bg-white/5 shadow-soft hover:ring-2 hover:ring-butterfly-400 transition"
              >
                {collection.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
