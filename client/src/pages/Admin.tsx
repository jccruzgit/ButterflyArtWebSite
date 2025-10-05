import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet, NavLink } from 'react-router-dom'

export default function Admin() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-display text-3xl mb-6">Admin</h1>
        <div className="flex gap-4 mb-6">
          <NavLink to="/admin/products" className="underline">Productos</NavLink>
          <NavLink to="/admin/categories" className="underline">Categorías</NavLink>
          <NavLink to="/admin/testimonials" className="underline">Testimonios</NavLink>
        </div>
        <Outlet />
      </main>
    </div>
  )
}
