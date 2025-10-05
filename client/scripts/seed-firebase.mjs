import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import admin from 'firebase-admin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
if (!serviceAccountPath || !fs.existsSync(serviceAccountPath)) {
  console.error('Set GOOGLE_APPLICATION_CREDENTIALS to your Firebase Admin JSON key.')
  process.exit(1)
}

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8')))
})
const db = admin.firestore()

const categories = [
  { id: 'amigurimis', name: 'Amigurimis', slug: 'amigurimis', order: 1 },
  { id: 'accesorios', name: 'Accesorios', slug: 'accesorios', order: 2 },
  { id: 'navidad', name: 'Navidad', slug: 'navidad', order: 3 },
  { id: 'san_valentin', name: 'San Valentín', slug: 'san_valentin', order: 4 }
]

const products = Array.from({length: 10}, (_, i)=> ({
  id: `p${i+1}`,
  title: `Pieza de crochet #${i+1}`,
  slug: `pieza-${i+1}`,
  categoryId: i%2===0 ? 'amigurimis' : 'accesorios',
  description: 'Pieza artesanal tejida a mano. Descripción de ejemplo.',
  materials: 'Hilo de algodón, relleno sintético',
  size: '20cm alto aprox.',
  leadTimeDays: 5 + (i%3),
  priceMin: 20 + i,
  priceMax: 35 + i,
  customizable: true,
  images: [
    { url: `https://picsum.photos/seed/bfa${i}/800/800`, alt: 'Imagen de ejemplo', width: 800, height: 800, variant: 'cover' }
  ],
  tags: ['hecho-a-mano','crochet'],
  status: 'published',
  createdAt: Date.now(),
  updatedAt: Date.now()
}))

const testimonials = [
  { id: 't1', author: 'Ana', text: '¡Trabajo hermoso y detallado!', rating: 5, createdAt: Date.now() },
  { id: 't2', author: 'Carlos', text: 'Entrega a tiempo y excelente atención.', rating: 5, createdAt: Date.now() },
  { id: 't3', author: 'María', text: 'Amigurimi precioso, mi hija lo amó.', rating: 5, createdAt: Date.now() },
]

async function run() {
  console.log('Seeding categories...')
  for (const c of categories) await db.collection('categories').doc(c.id).set(c)

  console.log('Seeding products...')
  for (const p of products) await db.collection('products').doc(p.id).set(p)

  console.log('Seeding testimonials...')
  for (const t of testimonials) await db.collection('testimonials').doc(t.id).set(t)

  console.log('Done ✅')
  process.exit(0)
}
run().catch(err=>{ console.error(err); process.exit(1) })
