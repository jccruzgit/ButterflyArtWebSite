import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  customerName: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  description: z.string().min(10, 'Describe tu idea'),
  colors: z.string().optional(),
  desiredDate: z.string().optional()
})

export default function CustomOrder() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })
  const onSubmit = (data: any) => {
    console.log('[Mock Email] Nuevo pedido personalizado:', data)
    alert('¡Pedido enviado! Te contactaremos pronto. (Simulación)')
  }

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-3xl mb-6">Pedido personalizado</h1>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="grid gap-1">
            <span>Nombre</span>
            <input {...register('customerName')} className="rounded-xl border px-3 py-2 bg-white/60 dark:bg-white/10" />
            {errors.customerName && <small className="text-red-600">{String(errors.customerName.message)}</small>}
          </label>
          <label className="grid gap-1">
            <span>Email</span>
            <input {...register('email')} className="rounded-xl border px-3 py-2 bg-white/60 dark:bg-white/10" />
            {errors.email && <small className="text-red-600">{String(errors.email.message)}</small>}
          </label>
          <label className="grid gap-1">
            <span>Descripción</span>
            <textarea {...register('description')} rows={4} className="rounded-xl border px-3 py-2 bg-white/60 dark:bg-white/10" />
            {errors.description && <small className="text-red-600">{String(errors.description.message)}</small>}
          </label>
          <label className="grid gap-1">
            <span>Colores preferidos (coma separados)</span>
            <input {...register('colors')} className="rounded-xl border px-3 py-2 bg-white/60 dark:bg-white/10" />
          </label>
          <label className="grid gap-1">
            <span>Fecha deseada</span>
            <input type="date" {...register('desiredDate')} className="rounded-xl border px-3 py-2 bg-white/60 dark:bg-white/10" />
          </label>
          <Button type="submit">Enviar pedido</Button>
        </form>
      </main>
      <Footer />
    </div>
  )
}
