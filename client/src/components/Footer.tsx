import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-4 text-sm opacity-80 flex items-center justify-between">
        <p>&copy; {new Date().getFullYear()} ButterflyArt.sv &mdash; Hecho a mano con amor &#x2728;</p>
        <div className="flex gap-3">
          <a href="https://www.instagram.com/butterflyart.sv/" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
          <a href="https://wa.me/50300000000" target="_blank" rel="noreferrer" className="hover:underline">WhatsApp</a>
        </div>
      </div>
    </footer>
  )
}

