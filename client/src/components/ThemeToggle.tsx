import React from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = React.useState(true)
  React.useEffect(()=>{
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  return (
    <button
      aria-label="Alternar tema"
      onClick={()=>setDark(d=>!d)}
      className="rounded-xl border px-3 py-1 text-sm hover:bg-white/10"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  )
}
