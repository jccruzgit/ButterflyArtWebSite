import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-butterfly-400 rounded ${isActive ? 'text-butterfly-600 dark:text-butterfly-200 font-semibold' : 'opacity-80'}`

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-950/70 border-b border-white/10">
      <nav aria-label="Principal" className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl text-butterfly-700 dark:text-butterfly-300">ButterflyArt.sv</Link>
        <div className="flex items-center gap-4">
          <NavLink to="/gallery" className={navLinkClasses}>Galeria</NavLink>
          <NavLink to="/custom-order" className={navLinkClasses}>Pedido personalizado</NavLink>
          <NavLink to="/about" className={navLinkClasses}>Acerca</NavLink>
          <NavLink to="/contact" className={navLinkClasses}>Contacto</NavLink>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
