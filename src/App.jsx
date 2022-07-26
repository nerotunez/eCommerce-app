import { Routes } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CartContainer from './components/Cart/CartContainer'
import CategoryContainer from './components/Category/CategoryContainer'
import HeadersContainer from './components/Header/HeaderContainer'
import ProductContainer from './components/Product/ProductContainer'

const App = () => {
  return (
    <Router>
      <HeadersContainer />
      <Routes>
        <Route path='/' element={<CategoryContainer />} />
        <Route path='cart' element={<CartContainer />} />
        <Route path='category/:categoryId' element={<CategoryContainer />} />
        <Route path='product/:categoryId' element={<ProductContainer />} />
        <Route path='*' element={'not found'} />
      </Routes>
    </Router>
  )
}

export default App
