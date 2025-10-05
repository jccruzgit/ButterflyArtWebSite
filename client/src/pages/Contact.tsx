import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-3xl mb-4">Contacto</h1>
        <ul className="space-y-2">
          <li><a className="underline" href="https://wa.me/50300000000" target="_blank">WhatsApp</a></li>
          <li><a className="underline" href="https://www.instagram.com/butterflyart.sv/" target="_blank">Instagram</a></li>
        </ul>
      </main>
      <Footer />
    </div>
  )
}
