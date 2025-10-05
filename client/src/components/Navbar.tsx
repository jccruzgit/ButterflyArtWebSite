import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-950/70 border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl text-butterfly-700 dark:text-butterfly-300">ButterflyArt.sv</Link>
        <div className="flex items-center gap-4">
          <NavLink to="/gallery" className="hover:underline">Galería</NavLink>
          <NavLink to="/custom-order" className="hover:underline">Pedido</NavLink>
          <NavLink to="/about" className="hover:underline">Acerca</NavLink>
          <NavLink to="/contact" className="hover:underline">Contacto</NavLink>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
