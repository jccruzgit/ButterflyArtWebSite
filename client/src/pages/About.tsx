import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-3xl mb-4">Acerca de la marca</h1>
        <p className="opacity-80">Historia de ButterflyArt.sv: arte de crochet con identidad salvadoreña, piezas hechas a mano y personalización.</p>
      </main>
      <Footer />
    </div>
  )
}
