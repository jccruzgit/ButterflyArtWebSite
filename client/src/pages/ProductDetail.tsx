import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { useParams, Link } from 'react-router-dom'

export default function ProductDetail() {
  const { slug } = useParams()
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 grid md:grid-cols-2 gap-8">
        <div className="rounded-3xl overflow-hidden bg-white/80 dark:bg-white/5 shadow-soft aspect-square" />
        <div>
          <h1 className="font-display text-3xl">Pieza {slug}</h1>
          <div className="mt-2 flex gap-2"><Badge>Personalizable</Badge></div>
          <p className="mt-4 opacity-80">Descripción, materiales, medidas y tiempo de elaboración.</p>
          <p className="mt-2 text-sm opacity-70">Rango de precio: $25–$45</p>
          <div className="mt-6">
            <Button as={Link} to="/custom-order">Solicitar personalización</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
