export function setSEO({ title, description, image }: { title: string; description?: string; image?: string }) {
  if (title) document.title = title
  if (description) {
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }

  // Keep basic OG/Twitter in sync (no image here)
  const ensure = (selector: string, attr: 'name' | 'property', value: string) => {
    let el = document.querySelector(selector) as HTMLMetaElement | null
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, value)
      document.head.appendChild(el)
    }
    return el
  }

  if (title) {
    ensure('meta[property="og:title"]', 'property', 'og:title').setAttribute('content', title)
    ensure('meta[name="twitter:title"]', 'name', 'twitter:title').setAttribute('content', title)
  }
  if (description) {
    ensure('meta[property="og:description"]', 'property', 'og:description').setAttribute('content', description)
    ensure('meta[name="twitter:description"]', 'name', 'twitter:description').setAttribute('content', description)
  }

  const img = image || '/og.jpg'
  ensure('meta[property="og:image"]', 'property', 'og:image').setAttribute('content', img)
  ensure('meta[name="twitter:image"]', 'name', 'twitter:image').setAttribute('content', img)
}
