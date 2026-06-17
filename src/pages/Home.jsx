import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../App.css'
import { products } from '../data/productData'
import { addToCart } from '../utils/cartStorage'

const Home = () => {
  var navigate = useNavigate()
  var [selectedCategory, setSelectedCategory] = useState('all')
  var [searchTerm, setSearchTerm] = useState('')

  var filteredProducts = products.filter(product => {
    var matchesCategory = selectedCategory === 'all' ? true : product.category.includes(selectedCategory)
    var matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  });

  return (
   <>
   <nav className="navbar">
      <h1>Instrumentos+ Deluxe Premium V.I.P</h1>
    </nav>
   <div className="filter-section">
     <input
       type="text"
      className="category-search"
       placeholder="Search"
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
     />
    <img className="cart-button" src="/img/cart-route.png" onClick={() => navigate('/cart')} />

     <select 
       id="category-filter"
       className="category-filter"
       value={selectedCategory}
       onChange={(e) => setSelectedCategory(e.target.value)}
     >
       <option value="all">Categories</option>
       <option value="wind-instrument">Wind</option>
       <option value="percussion-instrument">Percussion</option>
       <option value="string-instrument">String</option>
     </select>
   </div>

   <section className="container">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <div className="product" key={product.id}>
      <img  className="product-image" src={product.image} />
          <h2 className="product-title">{product.title}</h2>
          <div className="product2"> 
            <p className="product-price">€{product.price}</p>
          <img className="product-button" src="/img/cart.png" onClick={() => {
            addToCart(product)
            toast.success(`${product.title} added to cart!`, {
              position: 'bottom-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
          }} />
          </div>
          </div>
          ))
        ):(
        <div>
          <h2>No products found</h2>
          </div>
        )}
        </section>
        </>
      )
}

export default Home