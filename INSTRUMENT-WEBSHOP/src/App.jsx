import { useState } from 'react'
import './App.css'
import { products } from './data/productData';
import Navbar from './components/navbar';


const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category.includes(selectedCategory));

  return (
   <>
   <Navbar />
   <div className="filter-section">
     <select 
       id="category-filter"
       value={selectedCategory}
       onChange={(e) => setSelectedCategory(e.target.value)}
     >
       <option value="all">Categories</option>
       <option value="wind-instrument">Wind instrument</option>
       <option value="percussion-instrument">Percussion instrument</option>
       <option value="string-instrument">String instrument</option>
     </select>
   </div>
   <section className="container">
    {filteredProducts.map((product) => (
      <div key={product.id}>
        <h3>{product.title}</h3>
        <p>Price: €{product.price}</p>
        <img src={product.image} alt={product.title} />
        <p>Category: {product.category}</p>
      </div>
    ))}
   </section>
   </>
  )
}

export default App