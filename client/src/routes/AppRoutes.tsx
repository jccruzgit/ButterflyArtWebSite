import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Gallery from '../pages/Gallery'
import ProductDetail from '../pages/ProductDetail'
import CustomOrder from '../pages/CustomOrder'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Admin from '../pages/Admin'
import AdminProducts from '../features/admin/AdminProducts'
import AdminCategories from '../features/admin/AdminCategories'
import AdminTestimonials from '../features/admin/AdminTestimonials'

export default createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/gallery', element: <Gallery /> },
  { path: '/product/:slug', element: <ProductDetail /> },
  { path: '/custom-order', element: <CustomOrder /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      { path: 'products', element: <AdminProducts /> },
      { path: 'categories', element: <AdminCategories /> },
      { path: 'testimonials', element: <AdminTestimonials /> }
    ]
  }
])
