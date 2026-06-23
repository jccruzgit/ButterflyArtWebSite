export function initAnalytics() {
  const id = (import.meta as any).env?.VITE_GA_ID as string | undefined
  if (!id) return
  if ((window as any).gtag) return

  ;(window as any).dataLayer = (window as any).dataLayer || []
  function gtag() {
    ;(window as any).dataLayer.push(arguments)
  }
  ;(window as any).gtag = gtag

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(script)

  gtag('js', new Date())
  gtag('config', id, { send_page_view: false })

  const track = () => {
    try {
      gtag('event', 'page_view', {
        page_location: location.href,
        page_path: location.pathname + location.search,
        page_title: document.title,
      })
    } catch {}
  }

  const origPush = history.pushState
  const origReplace = history.replaceState
  history.pushState = function (...args: any[]) {
    const ret = origPush.apply(this, args as any)
    track()
    return ret
  } as any
  history.replaceState = function (...args: any[]) {
    const ret = origReplace.apply(this, args as any)
    track()
    return ret
  } as any
  window.addEventListener('popstate', track)
  track()
}
